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
export declare function virtual(): <T, K>(target: T, key: K) => void;
export declare function unique(): <T, K>(target: T, propertyKey: K) => void;
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
export declare function preSave(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export declare function postSave(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export declare function preInit(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export declare function postInit(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export declare function preCreate(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => any>) => void;
export declare function postCreate(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => any>) => void;
export declare function preValidate(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export declare function postValidate(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export declare function preRemove(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export declare function postRemove(): <T>(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>) => void;
export {};
