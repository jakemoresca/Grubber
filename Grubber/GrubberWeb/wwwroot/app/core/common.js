var EnumHelper = (function () {
    function EnumHelper() {
    }
    EnumHelper.getNames = function (e) {
        return Object.keys(e).filter(function (v) { return isNaN(parseInt(v, 10)); });
    };
    EnumHelper.getValues = function (e) {
        return Object.keys(e).map(function (v) { return parseInt(v, 10); }).filter(function (v) { return !isNaN(v); });
    };
    EnumHelper.getNamesAndValues = function (e) {
        return EnumHelper.getValues(e).map(function (v) { return { name: e[v], value: v }; });
    };
    return EnumHelper;
})();
exports.EnumHelper = EnumHelper;
//# sourceMappingURL=common.js.map