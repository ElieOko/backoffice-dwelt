export const columns = [
    { field: 'id',title:"N",editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'nom',title:"Nom complet",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field: 'role', title: "Role", filter: 'text', editable: false, resizable: false, },             
    // { field: 'description', title: "Description", filter: 'text', editable: false, resizable: false, },
    { field: 'phone', title: "Phone", filter: 'text', editable: false, resizable: false, },
    { field:'email',title:"Email",filter:'text',editable: false,resizable: false,},
];