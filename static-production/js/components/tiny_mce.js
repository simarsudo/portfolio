tinyMCE.init({
    selector: ".tinymce", // change this value according to your HTML
    skin: "CUSTOM",
    content_css: "CUSTOM",
    height: "85%",
    width: "99%",
    plugins:
        "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
    imagetools_cors_hosts: ["picsum.photos"],
    menubar: "file edit view insert format tools table help",
    toolbar:
        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist codesample | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor | ltr rtl",
    codesample_global_prismjs: true,
    codesample_languages: [
        { text: "HTML/XML", value: "markup" },
        { text: "JavaScript", value: "javascript" },
        { text: "CSS", value: "css" },
        { text: "Python", value: "python" },
        { text: "Java", value: "java" },
        { text: "C", value: "c" },
        { text: "C++", value: "cpp" },
    ],
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    link_list: [
        { title: "My page 1", value: "https://www.tiny.cloud" },
        { title: "My page 2", value: "http://www.moxiecode.com" },
    ],
    image_list: [
        { title: "My page 1", value: "https://www.tiny.cloud" },
        { title: "My page 2", value: "http://www.moxiecode.com" },
    ],
    image_class_list: [
        { title: "None", value: "" },
        { title: "Some class", value: "class-name" },
    ],
    importcss_append: true,
    file_picker_callback: function (callback, value, meta) {
        /* Provide file and text for the link dialog */
        if (meta.filetype === "file") {
            callback("https://www.google.com/logos/google.jpg", {
                text: "My text",
            });
        }

        /* Provide image and alt text for the image dialog */
        if (meta.filetype === "image") {
            callback("https://www.google.com/logos/google.jpg", {
                alt: "My alt text",
            });
        }

        /* Provide alternative source and posted for the media dialog */
        if (meta.filetype === "media") {
            callback("movie.mp4", {
                source2: "alt.ogg",
                poster: "https://www.google.com/logos/google.jpg",
            });
        }
    },
    image_caption: true,
    quickbars_selection_toolbar:
        "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: "sliding",
    contextmenu: "link image imagetools table",
});
