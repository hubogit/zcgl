<?php
	//$mobilenum = $_GET["mobilenum"];    //手机号
	include('dataconfig.php');
	include('SQLHelper.php');
	$dbhelper = new DBHelper();
	$dbhelper->GetConnection($db_host, $db_username, $db_password, $db_database);	//连接

	$secsql = "select * from userinfo;";
	$result = $dbhelper->Excute($secsql);
?>

<html>
<head>
<title></title>
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
	<title></title>

</head>
<body border=0>
	<table border="1">
     <tr>
         <td>姓名</td>
		 <td>性别</td>
		 <td>出生年月</td>
		 <td>通信地址</td>
		 <td>邮政编码</td>
		 <td>单位名称</td>
		<td>所属部门</td>
		<td>职务</td>

		<td>职称</td>
		<td>传真</td>
		<td>电话（手机）</td>
		<td>房间类型</td>
		<td>入住日期</td>
		<td>离店日期</td>
     </tr>
	<?php
	while($cntres = $result->fetch_assoc()){
	?>
		<tr>
			<td><?php echo $cntres["username"]; ?></td>
			<td><?php echo $cntres["sex"]; ?></td>
			<td><?php echo $cntres["birthday"]; ?></td>
			<td><?php echo $cntres["address"]; ?></td>
			<td><?php echo $cntres["postcode"]; ?></td>
			<td><?php echo $cntres["unitname"]; ?></td>
			<td><?php echo $cntres["bumen"]; ?></td>
			<td><?php echo $cntres["zhiwu"]; ?></td>
			<td><?php echo $cntres["level"]; ?></td>
			<td><?php echo $cntres["fax"]; ?></td>
			<td><?php echo $cntres["tel"]; ?></td>
			<td><?php echo $cntres["roomtype"]; ?></td>
			<td><?php echo $cntres["indate"]; ?></td>
			<td><?php echo $cntres["outdate"]; ?></td>
		</tr>
	<?php
		}
		$dbhelper->CloseConnection();
	?>
	 </table>

</body>
</html>
