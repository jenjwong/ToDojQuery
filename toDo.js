const makeNewToDoElement = function(val) {
  const $li = $(document.createElement('li'));
  $li.append($(`<label class="text-label"> ${val} </label>`))
  $li.prepend($('<input class="checkbox" type="checkbox" />'))
  $li.append($('<input class="edit-input" value="" type="text">'))
  $li.append($('<button type="button" class="edit-button">Edit</button>'))
  $li.append($('<button type="button" class="delete-button">Delete</button>'))
  bindTaskEvent($li, completeEvent);
  return $li
}


const updateLabel = function(el, val) {
  el.text(val);
}


const createToDo = function(){
  const $newEl = makeNewToDoElement($('.create-input').val());
  $('.active').append($newEl)
  $('.create-input').val('')
}

const completeEvent = function (e) {
  $(e.target).parent().detach();
  bindTaskEvent(this, incompleteEvent)
  $(e.target).prop('checked', !$(e.target).prop('checked'))
  $('.completed').prepend(this);
}

const incompleteEvent = function(e) {
  $(e.target).parent().detach();
  bindTaskEvent(this, completeEvent)
  $(e.target).prop('checked', !$(e.target).prop('checked'))
  $('.active').prepend(this);

}

const editTask = function($el) {
  const $textInput = $el.find('.edit-input');
  const $textLabel = $el.find('.text-label');
  if($el.hasClass('editMode')) {
    $textLabel.text($textInput.val())
    $el.find('.edit-button').text('Edit')
  }
  else {
    $textInput.val($textLabel.text())
    $el.find('.edit-button').text('Save')
  }
  $el.toggleClass('editMode')
};


const deleteTask = function (e) {
  console.log('he')
  console.log(e)
  e.detach();
}

const bindTaskEvent = (element, func) => {
  const $element = $(element);
  // $element.off();
  // const $checkbox = $element.find('checkbox')
  // $checkbox.change(func);

  $element.find('.delete-button').on("click", function(){
    deleteTask($element)
  });
  $element.find('.edit-button').on("click", function(){
    editTask($element)
  });
}




// $("#checkbox").prop("checked", true);


$('.button-create').on("click", createToDo);
