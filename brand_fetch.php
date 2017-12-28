<?php

include('database_connection.php');

$query = '';

$output = array();
$query .= "
    select * from brand inner join category on category.category_id = brand.category_id
";

if(isset($_POST["search"]["value"])){

    $query .= 'where brand.brand_name like "%'.$_POST["search"]["value"].'%" ';
    $query .= 'OR category.category_name like "%' .$_POST["search"]["value"].'%" ';
    $query .= 'OR brand.brand_status like "%'.$_POST["search"]["value"].'%" ';
}

if(isset($_POST["order"])){

    $query .= 'ORDER BY '.$_POST['order']['0']['column'].''.$_POST['order']['0']['dir'].' ';

} else {

    $query .= 'ORDER BY brand.brand_id DESC';
}

if($_POST["length"] != -1){

    $query .= 'LIMIT' .$_POST['start'] . ', ' . $_POST['length'];

}

$statement = $connect->prepare($query);

$statement->execute();

$result = $statement->fetchAll();

$data = array();


?>