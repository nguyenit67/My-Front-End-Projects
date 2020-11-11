$(document).ready(function () {
  // init SLICKjs slider for 
  // -*BRANDS*- section
  $(".brands-n-prods__slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  });

  $(".lets-talk__tabbox").smartTab({
    theme: "",
    selected: 1
  });

  // fix this shit?
  
});
