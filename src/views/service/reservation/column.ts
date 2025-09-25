export const columnsReservation = [
    { field: 'id',title:"N",editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'nom',title:"Nom complet",filter:'text',editable: false,resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field: 'role', title: "Maison", filter: 'text', editable: false, resizable: false, },             
    { field: 'description', title: "Type de visite", filter: 'text', editable: false, resizable: false, },
    { field: 'phone', title: "Heure", filter: 'text', editable: false, resizable: false, },
    // { field:'email',title:"Email",filter:'text',editable: false,resizable: false,},
];