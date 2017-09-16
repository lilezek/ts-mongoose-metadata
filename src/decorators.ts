// tslint:disable-next-line:no-namespace
declare global {
  export namespace Reflect {
    // tslint:disable:unified-signatures
    export function getMetadata<T = any>(key: "mongoose-metadata:virtuals", target: { new(...args: any[]): T }): {[k in keyof T]?: boolean } | undefined;
    export function getMetadata<T = any>(key: "mongoose-meatadata:required", target: { new(...args: any[]): T }): {[k in keyof T]?: boolean } | undefined;
    export function getMetadata<T = any>(key: "mongoose-metadata:unique", target: { new(...args: any[]): T }): {[k in keyof T]?: boolean } | undefined;
    export function getMetadata<T = any>(key: "mongoose-metadata:hooks", target: { new(...args: any[]): T }): IMongooseHooks | undefined;
    // tslint:enable:unified-signatures
  }
}

export function virtual<T = any>() {
  return (target: T, key: keyof T) => {
    let virtuals = Reflect.getMetadata<T>("mongoose-metadata:virtuals", target.constructor as any);
    if (!virtuals) {
      virtuals = {} as {[k in keyof T]: boolean };
      Reflect.defineMetadata("mongoose-metadata:virtuals", virtuals, target.constructor);
    }
    virtuals[key] = true;
  };
}

export interface IMongooseHook {
  pre?: any[];
  post?: any[];
}

export interface IMongooseHooks {
  init?: IMongooseHook;
  validate?: IMongooseHook;
  save?: IMongooseHook;
  remove?: IMongooseHook;
}

export function preSave<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.save = hooks.save || {};
    hooks.save.pre = hooks.save.pre || [];
    hooks.save.pre.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postSave<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.save = hooks.save || {};
    hooks.save.post = hooks.save.post || [];
    hooks.save.post.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function preInit<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.init = hooks.init || {};
    hooks.init.pre = hooks.init.pre || [];
    hooks.init.pre.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postInit<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.init = hooks.init || {};
    hooks.init.post = hooks.init.post || [];
    hooks.init.post.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function preValidate<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.validate = hooks.validate || {};
    hooks.validate.pre = hooks.validate.pre || [];
    hooks.validate.pre.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postValidate<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.validate = hooks.validate || {};
    hooks.validate.post = hooks.validate.post || [];
    hooks.validate.post.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function preRemove<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.remove = hooks.remove || {};
    hooks.remove.pre = hooks.remove.pre || [];
    hooks.remove.pre.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postRemove<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.remove = hooks.remove || {};
    hooks.remove.post = hooks.remove.post || [];
    hooks.remove.post.push(target[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function unique<T = any>() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let unique = Reflect.getMetadata<T>("mongoose-metadata:unique", target.constructor as any);
    if (!unique) {
      unique = {};
    }
    unique[propertyKey] = true;
    Reflect.defineMetadata("mongoose-metadata:unique", unique, target.constructor);
  };
}

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
