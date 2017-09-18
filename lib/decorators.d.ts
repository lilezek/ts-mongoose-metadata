declare global  {
    namespace Reflect {
        function getMetadata<T = any>(key: "mongoose-metadata:virtuals", target: {
            new (...args: any[]): T;
        }): {
            [k in keyof T]?: boolean;
        } | undefined;
        function getMetadata<T = any>(key: "mongoose-meatadata:required", target: {
            new (...args: any[]): T;
        }): {
            [k in keyof T]?: boolean;
        } | undefined;
        function getMetadata<T = any>(key: "mongoose-metadata:unique", target: {
            new (...args: any[]): T;
        }): {
            [k in keyof T]?: boolean;
        } | undefined;
        function getMetadata<T = any>(key: "mongoose-metadata:hooks", target: {
            new (...args: any[]): T;
        }): IMongooseHooks | undefined;
    }
}
export declare function virtual<T = any>(): (target: T, key: keyof T) => void;
export declare function unique<T = any>(): (target: any, propertyKey: string) => void;
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
export declare function preSave<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function postSave<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function preInit<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function postInit<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function preCreate<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function postCreate<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function preValidate<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function postValidate<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function preRemove<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function postRemove<T = any>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
