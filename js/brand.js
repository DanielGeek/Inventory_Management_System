

$(document).ready(function(){

    var branddataTable = $('#brand_data').DataTable({
        "processing":true,
        "serverSide":true,
        "order":[],
        "ajax":{
            url:"brand_fetch.php",
            type:"POST"
        },
        "columnDefs":[
            {
                "targets":[4,5],
                "orderable":false,
            },
        ],
        "pageLength":10
    });
});