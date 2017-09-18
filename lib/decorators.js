"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function unique() {
    return (target, propertyKey) => {
        let unique = Reflect.getMetadata("mongoose-metadata:unique", target.constructor);
        if (!unique) {
            unique = {};
        }
        unique[propertyKey] = true;
        Reflect.defineMetadata("mongoose-metadata:unique", unique, target.constructor);
    };
}
exports.unique = unique;
function preSave() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.save = hooks.save || {};
        hooks.save.pre = hooks.save.pre || [];
        hooks.save.pre.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.preSave = preSave;
function postSave() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.save = hooks.save || {};
        hooks.save.post = hooks.save.post || [];
        hooks.save.post.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.postSave = postSave;
function preInit() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.init = hooks.init || {};
        hooks.init.pre = hooks.init.pre || [];
        hooks.init.pre.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.preInit = preInit;
function postInit() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.init = hooks.init || {};
        hooks.init.post = hooks.init.post || [];
        hooks.init.post.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.postInit = postInit;
function preValidate() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.validate = hooks.validate || {};
        hooks.validate.pre = hooks.validate.pre || [];
        hooks.validate.pre.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.preValidate = preValidate;
function postValidate() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.validate = hooks.validate || {};
        hooks.validate.post = hooks.validate.post || [];
        hooks.validate.post.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.postValidate = postValidate;
function preRemove() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.remove = hooks.remove || {};
        hooks.remove.pre = hooks.remove.pre || [];
        hooks.remove.pre.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.preRemove = preRemove;
function postRemove() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:hooks", target.constructor);
        if (!hooks) {
            hooks = {};
        }
        hooks.remove = hooks.remove || {};
        hooks.remove.post = hooks.remove.post || [];
        hooks.remove.post.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
    };
}
exports.postRemove = postRemove;
function postCreate() {
    return (target, propertyKey, descriptor) => {
        let hooks = Reflect.getMetadata("mongoose-metadata:post-create", target.constructor);
        if (!hooks) {
            hooks = [];
        }
        hooks.push(target[propertyKey]);
        Reflect.defineMetadata("mongoose-metadata:post-create", hooks, target.constructor);
    };
}
exports.postCreate = postCreate;
// export function required<T = any>() {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     let required = Reflect.getMetadata<T>("mongoose-meatadata:required", target.constructor as any);
//     if (!required) {
//       required = {};
//     }
//     required[propertyKey] = true;
//     Reflect.defineMetadata("mongoose-meatadata:required", required, target.constructor);
//   };
// }
//# sourceMappingURL=decorators.js.map