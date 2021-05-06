//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Employee/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.EmployeeID + '</td>';
                html += '<td>' + item.EmployeeName + '</td>';
                html += '<td>' + item.Age + '</td>';
                html += '<td>' + item.EmployeeState + '</td>';
                html += '<td>' + item.Country + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.EmployeeID + ')">Edit</a> | <a href="#" onclick="Delele(' + item.EmployeeID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#EmployeeID').val(),
        EmployeeName: $('#EmployeeName').val(),
        Age: $('#Age').val(),
        EmployeeState: $('#EmployeeState').val(),
        Country: $('#Country').val()
    };
    $.ajax({
        url: "/Employee/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#EmployeeName').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#EmployeeState').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Employee/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EmployeeID').val(result.EmployeeID);
            $('#EmployeeName').val(result.EmployeeName);
            $('#Age').val(result.Age);
            $('#EmployeeState').val(result.EmployeeState);
            $('#Country').val(result.Country);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#EmployeeID').val(),
        EmployeeName: $('#EmployeeName').val(),
        Age: $('#Age').val(),
        EmployeeState: $('#EmployeeState').val(),
        Country: $('#Country').val(),
    };
    $.ajax({
        url: "/Employee/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#EmployeeID').val("");
            $('#EmployeeName').val("");
            $('#Age').val("");
            $('#EmployeeState').val("");
            $('#Country').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Employee/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#EmployeeID').val("");
    $('#EmployeeName').val("");
    $('#Age').val("");
    $('#EmployeeState').val("");
    $('#EmployeeCountry').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#EmployeeName').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#EmployeeState').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#EmployeeName').val().trim() == "") {
        $('#EmployeeName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmployeeName').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
    }
    if ($('#EmployeeState').val().trim() == "") {
        $('#EmployeeState').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmployeeState').css('border-color', 'lightgrey');
    }
    if ($('#Country').val().trim() == "") {
        $('#Country').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country').css('border-color', 'lightgrey');
    }
    return isValid;
}  