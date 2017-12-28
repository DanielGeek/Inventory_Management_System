

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

    $(document).on('click', '.update', function(){

        var category_id = $(this).attr("id");
       
        var btn_action = 'fetch_single';
        $.ajax({
            url:"category_action.php",
            method:"POST",
            data:{
                category_id:category_id,
                btn_action:btn_action
            },
            dataType:"json",
            success:function(data){
                $('#categoryModal').modal('show');
                $('#category_name').val(data.category_name);
                $('.modal-title').html("<i class='fa fa-pencil-square-o'></i> Edit Category");
                $('#category_id').val(category_id);
                $('#action').val('Edit');
                $('#btn_action').val('Edit');
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

    $(document).on('click', '.category_delete', function(){

        var category_id = $(this).attr('id');
        var status = $(this).data("status");
        var btn_action = 'category_delete';
        if(confirm("Are you sure you want to change status?")){

            $.ajax({
                url:"category_action.php",
                method:"POST",
                data:{category_id:category_id, status:status, btn_action:btn_action},
                success:function(data){
                    $('#alert_action').fadeIn('slow').html('<div class="alert alert-info">'+data+'</div>').delay(1000).fadeOut('slow');
                    categorydataTable.ajax.reload();
                }
            })
        } else {

            return false;
        }
    });
   
});