<?php
//login.php

include('database_connection.php');

if(isset($_SESSION['type'])){
    header("location:index.php");
}

$message = '';

if(isset($_POST["login"])){
    $query = "
    select * from user_details
        where user_email = :user_email
    ";
    $statement = $connect->prepare($query);
    $statement->execute(
        array(
                'user_email' => $_POST["user_email"]
        )
    );
    $count = $statement->rowCount();
    if($count > 0){
        $result = $statement->fetchAll();
        foreach($result as $row){
            if(password_verify($_POST["user_password"], $row["user_password"])){
                if($row['user_status'] == 'Active'){
                    $_SESSION['type'] = $row['user_type'];
                    $_SESSION['user_id'] = $row['user_id'];
                    $_SESSION['user_name'] = $row['user_name'];
                    header("location:index.php");
                } else {
                    $message = "<label>Your account is disabled, Contact Admin</label>";
                }
            } else {
                $message = "<label>Wrong Password</label>";
            }
        }
    } else {
        $message = "<label>Wrong Email Address</label>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inventory Management System using PHP with Ajax Jquery</title>
    <script src="js/jquery-1.10.2.min.js"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <script src="js/bootstrap.min.js"></script>
</head>
<body>
    <br>
    <div class="container">
        <h2 align="center">Inventory Management System using PHP with Ajax Jquery</h2>
        <br>
        <div class="panel panel-default">
            <div class="panel-heading">Login</div>
            <div class="panel-body">
                <form action="" method="post">
                    <?php echo $message; ?>
                    <div class="form-group">
                        <label for="user_email">User Email</label>
                        <input type="text" id="user_email" name="user_email" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="user_password">Password</label>
                        <input type="password" id="user_password" name="user_password" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <input type="submit" name="login" value="Login" class="btn btn-info" />
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
            <br>
                <p>Master user<br>
                    <label>Email</label> - john_smith@gmail.com<br>
                    <label>Password</label> - password<br>
                </p>
                <p>Sub User<br>
                    <label>Email</label> - roy_hise@gmail.com<br>
                    <label>Password</label> - password<br>
                </p>
            </div>
        </div>
    </div>
    
    
</body>
</html>