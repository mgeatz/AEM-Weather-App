
var Cru = (function(v) {
    return v;
}(Cru || {}));

Cru.components = (function(v) {
    return v;
}(Cru.components || {}));


Cru.components.tile = {

    DEFAULT_RENDITION_VALUE : "CruHalf432x243", //used for the 1/2, 1/3 and 1/4 widths
    CRU_RENDITION_VALUE : "CruWhole848x477", //used for the 2/3 and whole grid widths
    CRU_WIDTHS_VALUES_ARRAY : [ //array of widths that should use the CruWhole848x477 rendition 
	    "col-md-12",
        "col-md-8  col-sm-6"
    ],
    CRU_1000_CHARACTERS_WIDTHS_ARRAY : [ //array of widths that should limit characters to 1000. Everything else is limited to 600.
		"col-md-12",
        "col-md-12  coverphoto",
        "col-md-8  col-sm-6",
        "col-md-6  col-sm-6"
    ],

    PARSYS_CLASSES_ARRAY : [
		".tile-container-parsys",
        ".post-body-parsys",
        ".content-parsys"
    ],

    afterRender : function(container){ //adds a div with clear:both style after the last tile in the container so it doesn't overlap with the parsys
        var cqGeneratedDiv = container.element;
        var gridItemDiv = cqGeneratedDiv.firstElementChild;
        var tileClass = $(gridItemDiv).attr("class");
        $(cqGeneratedDiv).addClass(tileClass) ;
        $(gridItemDiv).removeClass(tileClass);
        this.PARSYS_CLASSES_ARRAY.forEach(function(parsysClass) {
            if(Xumak.Utils.elementExists($(parsysClass))) {
                if($(parsysClass + " .divider").length == 0) {
                    $( "<div class='divider'></div>" ).insertAfter($(parsysClass + " .parbase.section").last());
                }
            }
        });
    },

    updateRenditionField : function(container) {

        var renditionWidget = container.findParentByType('dialog').getField("./imageRenditionName");
    	var width = container.getValue();
        renditionWidget.setValue(this.DEFAULT_RENDITION_VALUE);
        if(width == "col-md-12  coverphoto"){
            renditionWidget.setValue("CruCoverPhoto880x374");
        } else {
    	if(this.CRU_WIDTHS_VALUES_ARRAY.indexOf(width) != -1){
        	renditionWidget.setValue(this.CRU_RENDITION_VALUE);
		}
        }
    },

    validator : function(value, container) {
        var width = container.findParentByType('dialog').getField("./width").getValue();
        var characters = Cru.widgets.Util.richTextEditorCharacterCount(value);
        var limit = (this.CRU_1000_CHARACTERS_WIDTHS_ARRAY.indexOf(width) == -1) ? 600 : 1000;
        if( Cru.widgets.Util.richTextEditorCharacterCount(value) > limit ){
            return CQ.I18n.getMessage("The character count limit is " + limit);
        } else {
            return true;
        }
        
        console.log("width = " + width);
        console.log("limit = " + limit);

    },

    validate_video_code: function(value) {
        var domains = Cru.widgets.Util.getGlobalProperty("domains");

        // regular expressions we will use
        capture_source = /(src|href)=["']?((?:.(?!["']?\\s+(?:\S+)=|[>"']))+.)["']?/igm
        extract_domain = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i

        // capture source from the embed code
        var captured_source = value.match(capture_source);

        // strip the `src` and `href` from the extracted do
        for (var i = 0; i < captured_source.length; i++) {
            // remove `src` tag if present
            if (captured_source[i].search(/^src=['"]/i) != -1) {
                captured_source[i] = captured_source[i].replace(/^src=['"]/i, '').replace(/['"]/i, '');
            }

            // remove `href` tag if present
            if (captured_source[i].search(/^href=['"]/i) != -1) {
                captured_source[i] = captured_source[i].replace(/^href=['"]/i, '').replace(/['"]/i, '');
            }
        }

        // extract domains from urls
        for (var i = 0; i < captured_sources.length; i++) {
            captured_sources[i] = captured_sources[i].match(extract_domain)[1];
            console.log(captured_sources[i]);
        }
    }
}

