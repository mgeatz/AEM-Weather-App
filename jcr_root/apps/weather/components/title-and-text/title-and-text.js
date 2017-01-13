"use strict";

/**
 * Creates a component node with name, if node does not yet exist.
 */
use([], function () {
    var newResourceName = this.name;
    var newResourceType = this.type;
    var resourceResolver = resource.getResourceResolver();
    var newNodePath = resource.path + "/" + newResourceName;
    var existingComponentResource = resourceResolver.getResource(newNodePath);
 
    if(existingComponentResource == null){
        var properties = {"jcr:primaryType":"nt:unstructured",
            "sling:resourceType":newResourceType};
        resourceResolver.create(resource, newResourceName, properties);
        resourceResolver.commit();
    }
});