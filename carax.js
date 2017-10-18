


function carax (selector) {
  var $refCol = $(selector).eq(0);
  var $container = $refCol.parent();
  var h = $refCol.outerHeight(true); // Hauteur de la colonne de référence
  var vh = $(window).outerHeight(true); // Hauteur du viewport
  var top = $container.offset().top;
  var bottom = top + h;


  // Tableau des colonnes à animer
  var cols = _($container.children())
  .map(o =>
    ({
      elem: o,
      ratio: ($(o).outerHeight(true) / h) - 1
    })
  )
  .reject(o => o.ratio <= 0)
  .value();

  $container.css({ height: h + "px" });
  $(cols).css({ overflow: "hidden" });

  $(window).on("scroll", (e) => {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > top && scrollTop + vh <= bottom) {
      _(cols).forEach(c => {
        $(c.elem).css({ transform: "translateY(" + (top - scrollTop) * (2 + c.ratio) + "px)" });
      });

    }
  });

}