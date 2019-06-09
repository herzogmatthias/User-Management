$(document).ready(() => {
  $("#DeleteUserButton").click(e => {
    const url =
      window.location.origin + "/deleteUser/" + e.currentTarget.dataset.id;
    $.get(url).then(data => {
      $("#users").replaceWith($(data).find("#users"));
      $("#ConfirmationModal").modal("hide");
    });
  });
});
