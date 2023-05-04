const path = require('node:path');
const fs = require('fs');

class PluginManager{
    constructor(pluginsDirPath = ""){
        this.plugins = [];
        this.pluginsDirPath = pluginsDirPath;
    }

    loadPlugins(){
        let pluginsDir = fs.readdirSync(this.pluginsDirPath);

        pluginsDir.forEach( File => {
            let pluginPath = path.join(this.pluginsDirPath, File);
            let plugin = require(pluginPath);

            this.plugins.push(plugin.module)
        });
    }

    refresgPlugins(){
        let pluginsDir = fs.readdirSync(this.pluginsDirPath);

        this.plugins = []
        pluginsDir.forEach( File => {
            let pluginPath = path.join(this.pluginsDirPath, File);
            
            delete require.cache[require.resolve(pluginPath)];
            
            let plugin = require(pluginPath);
            

            this.plugins.push(plugin.module)
        });
    }
}

let pm = new PluginManager(path.join(__dirname, "plugins"));

pm.loadPlugins();

setInterval(function(){
    pm.refresgPlugins();
},500);

setInterval(function(){
    console.clear();
    for (let i = 0; i < pm.plugins.length; i++){
        console.log(pm.plugins[i](3,4));
    }
},1000)