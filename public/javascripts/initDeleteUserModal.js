$(document).ready(function() {
  var Buttons = document.querySelectorAll('[id*="DeleteButton"]');
  for (var button of Buttons) {
    $(button).click(e => {
      $("#DeleteText").text(
        `Are you sure that you want to delete ${e.currentTarget.dataset.user}?`
      );
      $("#DeleteUserButton").attr("data-id", e.currentTarget.dataset.id);
    });
  }
});
