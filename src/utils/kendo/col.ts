export const columnsWorkSpace = [
    { field: 'id',title:"N",editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'name',title:"WorkSpace",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}               
];
export const columnsServer = [
    { field: 'id',title:"N",editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'name',title:"Server",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'ip',title:"IP Address/IPV4",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'port',title:"Port",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'url',title:"Nom WorkSpace",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'route_api',title:"Route API",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}            
];
export const columnsCollection = [
    { field: 'id',title:"N",editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'name',title:"Collection",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'server.name',title:"Server",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},             
];
export const columnsRoute = [
    { field: 'id',title:"N",editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'name',title:"Route",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'method',title:"Method",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'collection.name',title:"Collection",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:'server.name',title:"Server",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}              
];
//Telemetry https://www.youtube.com/watch?v=yqHxcm0soTU
