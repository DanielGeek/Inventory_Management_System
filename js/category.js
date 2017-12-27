

$(document).ready(function(){
    
    $('#add_button_category').click(function(){
        $('#category_form')[0].reset();
        $('.modal-title').html("<i class='fa fa-plus'></i> Add Category");
        $('#action').val('Add');
        $('#btn_action').val('Add');
    });

    $(document).on('submit', '#category_form', function(event){
        event.preventDefault();
        $('#action').attr('disabled', 'disabled');
        var form_data = $(this).serialize();
        $.ajax({
            url:"category_action.php",
            method:"POST",
            data:form_data,
            success:function(data){
                $('#category_form')[0].reset();
                $('#categoryModal').modal('hide');
                $('#alert_action').fadeIn(1000).html('<div class="alert alert-success">'+data+'</div>').delay(1000).fadeOut(3000);
                $('#action').attr('disabled', false);
                categorydataTable.ajax.reload();
            }
        })
    });

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