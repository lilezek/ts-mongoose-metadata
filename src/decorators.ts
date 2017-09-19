import * as mongoose from "mongoose";

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

function asyncToMongooseHook(p: (...args: any[]) => Promise<any>) {
  return function mongooseHook(this: any, next: (err?: mongoose.NativeError) => void) {
    p.call(this).then(next).catch(next);
  };
}

export function virtual() {
  return <T, K>(target: T, key: K) => {
    let virtuals = Reflect.getMetadata<T>("mongoose-metadata:virtuals", target.constructor as any);
    if (!virtuals) {
      virtuals = {} as {[K in keyof T]: boolean };
      Reflect.defineMetadata("mongoose-metadata:virtuals", virtuals, target.constructor);
    }
    virtuals[key] = true;
  };
}

export function unique() {
  return <T, K>(target: T, propertyKey: K) => {
    let uniq = Reflect.getMetadata<T>("mongoose-metadata:unique", target.constructor as any);
    if (!uniq) {
      uniq = {};
    }
    uniq[propertyKey] = true;
    Reflect.defineMetadata("mongoose-metadata:unique", uniq, target.constructor);
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
  create?: IMongooseHook;
}

export function preSave() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.save = hooks.save || {};
    hooks.save.pre = hooks.save.pre || [];
    hooks.save.pre.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postSave() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.save = hooks.save || {};
    hooks.save.post = hooks.save.post || [];
    hooks.save.post.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function preInit() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.init = hooks.init || {};
    hooks.init.pre = hooks.init.pre || [];
    hooks.init.pre.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postInit() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.init = hooks.init || {};
    hooks.init.post = hooks.init.post || [];
    hooks.init.post.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function preCreate() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => any>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.create = hooks.create || {};
    hooks.create.pre = hooks.create.pre || [];
    hooks.create.pre.push((target as any)[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postCreate() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => any>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.create = hooks.create || {};
    hooks.create.post = hooks.create.post || [];
    hooks.create.post.push((target as any)[propertyKey]);
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function preValidate() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.validate = hooks.validate || {};
    hooks.validate.pre = hooks.validate.pre || [];
    hooks.validate.pre.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postValidate() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.validate = hooks.validate || {};
    hooks.validate.post = hooks.validate.post || [];
    hooks.validate.post.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function preRemove() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.remove = hooks.remove || {};
    hooks.remove.pre = hooks.remove.pre || [];
    hooks.remove.pre.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

export function postRemove() {
  return <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(... p: any[]) => Promise<any>>) => {
    let hooks = Reflect.getMetadata<T>("mongoose-metadata:hooks", target.constructor as any);
    if (!hooks) {
      hooks = {};
    }
    hooks.remove = hooks.remove || {};
    hooks.remove.post = hooks.remove.post || [];
    hooks.remove.post.push(asyncToMongooseHook((target as any)[propertyKey]));
    Reflect.defineMetadata("mongoose-metadata:hooks", hooks, target.constructor);
  };
}

// export function required() {
//   return <T, K extends keyof T>(target: T, propertyKey: K, descriptor: PropertyDescriptor) => {
//     let required = Reflect.getMetadata<T>("mongoose-meatadata:required", target.constructor as any);
//     if (!required) {
//       required = {};
//     }
//     required[propertyKey] = true;
//     Reflect.defineMetadata("mongoose-meatadata:required", required, target.constructor);
//   };
// }
