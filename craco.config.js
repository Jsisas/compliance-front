const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
    plugins: [{plugin: CracoAntDesignPlugin}, {
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    }]
};