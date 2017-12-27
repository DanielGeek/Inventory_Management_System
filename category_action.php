<?php

    include('database_connection.php');

    if(isset($_POST['btn_action'])){
        if($_POST['btn_action'] == 'Add'){

            $query = "
		INSERT INTO category (category_name) 
		VALUES (:category_name)
		";
        $statement = $connect->prepare($query);
		$statement->execute(
			array(
				':category_name'	=>	$_POST["category_name"]
			)
		);
		$result = $statement->fetchAll();
		if(isset($result))
		{
			echo 'Category Name Added';
		}
    }
}
?>