if (moment().format('HH:MM:ss') === '23:59:59') {
    window.localStorage.clear();
}

//set current date in header
var currentDate = moment().format("dddd, MMMM Do YYYY");
$('#currentDay').text(currentDate);

if (moment().minutes() === 00) {
    console.log('hour check');
    checkTime();
}

window.onload = function() {
    loadTasks();
    checkTime();
}

//check if divs are in past and change class
function checkTime() {
    var currentHour = moment().hour();
    var hourArr = $('.hour');

    for (i = 0; i < hourArr.length; i++) {
        
        if (parseInt(hourArr[i].id) < currentHour) {
            $('#' + hourArr[i].id).next().addClass('past'); 
        }
        
        if (currentHour === parseInt(hourArr[i].id)) {
            $('#' + hourArr[i].id).next().addClass('present'); 
        }
        
        if (currentHour < parseInt(hourArr[i].id)) {
            $('#' + hourArr[i].id).next().addClass('future'); 
        }
    }
};

$('.container').on('click', function() {
    if (event.target.matches('.col-8')) {
        var text = event.target.innerText;
        var timeClass = event.target.classList[3];
        console.log(timeClass)
        var textInput = $("<textarea>").attr('id', 'task-edit')
        $("<textarea>")
        textInput.attr('class', timeClass);
        textInput.addClass('col-8');
        textInput.val(text);
        $(event.target).replaceWith(textInput);
        textInput.trigger('focus');
    }
});


$('.container').on('blur', 'textarea', function() {
    var taskDiv = '<div class="col-8 d-flex align-items-center">' + $('textarea').val().trim() + '</div>';
    $('textarea').replaceWith(taskDiv);
    checkTime();
});

$('.saveBtn').on('click', function(event) {

    var id = $(this).siblings('.hour')[0].id;
    var task = $(this).siblings('.col-8')[0].innerText;

    let tasks =  JSON.parse(localStorage.getItem("yourTasks")) || [] ;

    var taskObj = {
        "time": id, 
        "task": task 
    };

    tasks.push(taskObj);
    localStorage.setItem("yourTasks", JSON.stringify(tasks));

    checkTime();
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("yourTasks"));

    for (i = 0; i < tasks.length; i++) {

        $('#' + tasks[i].time).siblings('.col-8')[0].innerText = tasks[i].task;
    }
}



