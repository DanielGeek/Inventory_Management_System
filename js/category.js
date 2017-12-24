

$(document).ready(function(){
    
    

    var categorydataTable = $('#category_data').DataTable({
        "processing":true,
        "serverSide":true,
        "order":[],
        "ajax":{
            url:"category_fetch.php",
            type:"POST"
        },
        "columnDefs":[
            {
                "targets":[3, 4],
                "orderable":false,
            },
        ],
        "pageLength":25
    });
   
});