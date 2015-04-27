YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Gruntfile",
        "Utils"
    ],
    "modules": [
        "Grunt file",
        "jshint",
        "uglify",
        "yuidoc"
    ],
    "allModules": [
        {
            "displayName": "Grunt file",
            "name": "Grunt file",
            "description": "Gruntfile.js is used to configure or define tasks and load Grunt plugins.\n\nUse uglify with Grunt to minify all \".js\" file in documentation\nUse yuidoc to generate the docs"
        },
        {
            "displayName": "jshint",
            "name": "jshint",
            "description": "Jshint permit to flags suspicious usage in programs"
        },
        {
            "displayName": "uglify",
            "name": "uglify",
            "description": "Uglify permit to minify javascript file"
        },
        {
            "displayName": "yuidoc",
            "name": "yuidoc",
            "description": "Yuidoc permit to generate the yuidoc of the Yocto Stack Generator"
        }
    ]
} };
});