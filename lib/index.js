"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const awesome_metadata_1 = require("awesome-metadata");
const mongoose = require("mongoose");
require("reflect-metadata");
__export(require("./decorators"));
function getAtmBody(target) {
    return Reflect.getMetadata("atm:body", target);
}
// function getRequired(target: any) {
//   return Reflect.getMetadata("mongoose-metadata:mandatory", target);
// }
function getUniques(target) {
    return Reflect.getMetadata("mongoose-metadata:unique", target);
}
function getVirtuals(target) {
    return Reflect.getMetadata("mongoose-metadata:virtuals", target);
}
const mapTypes = {
    string: String,
    number: Number,
    boolean: Boolean,
    null: null,
    undefined,
    function: Function,
    object: Object,
};
function atmTypeToSchemaType(type) {
    if (type.kind === awesome_metadata_1.ETypes.CLASS) {
        return atmBodyToSchemaConstructor(type.ctor);
    }
    else if (type.kind === awesome_metadata_1.ETypes.INTERFACE) {
        return Object;
    }
    else if (type.kind === awesome_metadata_1.ETypes.PRIMITIVE) {
        return mapTypes[type.primitive];
    }
    else if (type.kind === awesome_metadata_1.ETypes.UNION) {
        if (!type.and) {
            // TODO: Implement this
            throw new Error("Type union not implemented");
        }
        else {
            // TODO: Implement this
            throw new Error("Type intersection not implemented");
        }
    }
}
function atmBodyToSchemaConstructor(theClass) {
    const body = getAtmBody(theClass);
    const virtual = getVirtuals(theClass) || {};
    // const required = getRequired(theClass) || {};
    const unique = getUniques(theClass) || {};
    const schemaObject = {};
    for (const k in body) {
        // Ignore virtuals. Virtuals must not persist.
        if (!(k in virtual)) {
            const obj = body[k];
            const type = obj.type;
            schemaObject[k] = { type: atmTypeToSchemaType(type) };
            if (k in unique) {
                schemaObject[k].index = { unique: true };
            }
            if (!obj.optional) {
                schemaObject[k].required = true;
            }
        }
    }
    return schemaObject;
}
function classToModel(theClass, objectName, collname) {
    let model = Reflect.getMetadata("mongoose-metadata:model", theClass);
    if (!model) {
        const schemaObject = atmBodyToSchemaConstructor(theClass);
        const hooks = Reflect.getMetadata("mongoose-metadata:hooks", theClass);
        const schema = new mongoose.Schema(schemaObject);
        // Register hooks:
        if (hooks) {
            for (const k in hooks) {
                // Skip create hook
                if (k !== "create") {
                    const hook = hooks[k];
                    if (hook.post) {
                        hook.post.forEach((p) => {
                            schema.post(k, p);
                        });
                    }
                    if (hook.pre) {
                        hook.pre.forEach((p) => {
                            schema.pre(k, p);
                        });
                    }
                }
            }
        }
        // Register statics:
        for (const k in theClass) {
            if (theClass.hasOwnProperty(k)) {
                if (typeof theClass[k] === "function") {
                    schema.statics[k] = theClass[k];
                }
            }
        }
        // Register methods:
        for (const k of Object.getOwnPropertyNames(theClass.prototype)) {
            if (k !== "constructor" && typeof theClass.prototype[k] === "function") {
                schema.methods[k] = theClass.prototype[k];
            }
        }
        if (collname) {
            Reflect.defineMetadata("mongoose-metadata:model", model = mongoose.model(objectName, schema, collname), theClass);
        }
        else {
            Reflect.defineMetadata("mongoose-metadata:model", model = mongoose.model(objectName, schema), theClass);
        }
        return ((parent) => {
            function HookedModel(a, b) {
                if (hooks && hooks.create && hooks.create.pre) {
                    hooks.create.pre.forEach((f) => f.call(this, a, b));
                }
                this.constructor = parent;
                parent.call(this, a, b);
                if (hooks && hooks.create && hooks.create.post) {
                    hooks.create.post.forEach((f) => f.call(this, a, b));
                }
            }
            // Copy all static functions:
            for (const k in parent) {
                if (parent.hasOwnProperty(k)) {
                    HookedModel[k] = parent[k];
                }
            }
            HookedModel.__proto__ = parent.__proto__;
            HookedModel.prototype = Object.create(parent.prototype);
            HookedModel.prototype.constructor = HookedModel;
            return HookedModel;
        })(model);
    }
    else {
        throw new Error("This class had already registed a model");
    }
}
exports.classToModel = classToModel;
function classToSchema(theClass) {
    return new mongoose.Schema(atmBodyToSchemaConstructor(theClass));
}
exports.classToSchema = classToSchema;
//# sourceMappingURL=index.js.map