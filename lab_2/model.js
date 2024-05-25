document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("postText");

  input.addEventListener("input", function () {
    var value = input.value;

    // Ограничим количество символов в описании поста
    if (value.length > 200) {
      input.value = value.substring(0, 200);
    }
  });
});
