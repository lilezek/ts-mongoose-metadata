"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awesome_metadata_1 = require("awesome-metadata");
const mongoose = require("mongoose");
require("reflect-metadata");
function getAtmBody(target) {
    return Reflect.getMetadata("atm:body", target);
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
        return atmBodyToSchemaConstructor(getAtmBody(type.ctor));
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
function atmBodyToSchemaConstructor(body) {
    const schemaObject = {};
    for (const k in body) {
        const obj = body[k];
        const type = obj.type;
        schemaObject[k] = atmTypeToSchemaType(type);
    }
    return schemaObject;
}
function virtual() {
    return (target, key) => {
        let virtuals = Reflect.getMetadata("mongoose-metadata:virtuals", target.constructor);
        if (!virtuals) {
            virtuals = {};
            Reflect.defineMetadata("mongoose-metadata:virtuals", virtuals, target.constructor);
        }
        virtuals[key] = true;
    };
}
exports.virtual = virtual;
function classToModel(theClass, objectName, collname) {
    let model = Reflect.getMetadata("mongoose-metadata:model", theClass);
    if (!model) {
        const schemaObject = atmBodyToSchemaConstructor(getAtmBody(theClass));
        // Use here virtuals and hooks.
        const schema = new mongoose.Schema(schemaObject);
        if (collname) {
            Reflect.defineMetadata("mongoose-metadata:model", model = mongoose.model(objectName, schema, collname), theClass);
        }
        else {
            Reflect.defineMetadata("mongoose-metadata:model", model = mongoose.model(objectName, schema), theClass);
        }
    }
    else {
        throw new Error("This class had already registed a model");
    }
    return model;
}
exports.classToModel = classToModel;
function classToSchema(theClass) {
    return new mongoose.Schema(atmBodyToSchemaConstructor(getAtmBody(theClass)));
}
exports.classToSchema = classToSchema;
//# sourceMappingURL=index.js.map