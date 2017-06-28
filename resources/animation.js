$(function()
{
  $('.holdings-number').each(function() {
    var targetCount = $(this).html();

    $(this).data('increment-to', targetCount);
    console.log(targetCount);
  });

  var scrollTrigger = new ScrollTrigger();
  $('.holdings-number').addClass('animate-dive');
});

function holdingsNumberInView()
{
      $(this).removeClass('animate-dive');

      var options = {
        startVal: 0,
        endVal: $(this).data('increment-to'),
        duration: $(this).data('duration'),
        decimals : $(this).data('decimals'), 
        options: {
          useEasing : true, 
          useGrouping : true, 
          separator : ',', 
          suffix : $(this).data('suffix') || ''
        }
      };

      $(this).countup(options);
}
