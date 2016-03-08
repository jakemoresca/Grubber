export class EnumHelper {
    static getNames(e: any) {
        return Object.keys(e).filter(v => isNaN(parseInt(v, 10)));
    }

    static getValues(e: any) {
        return Object.keys(e).map(v => parseInt(v, 10)).filter(v => !isNaN(v));
    }

    static getNamesAndValues(e: any) {
        return EnumHelper.getValues(e).map(v => { return { name: e[v] as string, value: v }; });
    }
}

export class ObjHelper {
    static copyObject<T>(object: T): T {
        var objectCopy = <T>{};

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }

        return objectCopy;
    }
}