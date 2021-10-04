(function(){
	var oldval=$('input[name=state],input[name=vstate]').attr('value');
	$('input[name=state],input[name=vstate]').parent().empty().append($('<select>').attr('name', 'state').attr('value', oldval));
	oldval=$('input[name=county],input[name=vcounty]').attr('value');
	$('input[name=county],input[name=vcounty]').parent().empty().append($('<select>').attr('name','county').attr('value', oldval));

	$(function() {
	  $.getJSON('/extjs/statejson.php')
		.done(function(data) {
		  window.states_data = data;
		  init_state_ddl();
		  init_county_ddl();
		});
	  $('select[name=state]').on('change selected blur',function(){
		init_county_ddl();
	  });
	});
	
	function init_state_ddl() {
	  var state = $('select[name=state]');
	  var stateval = state.data('value') || state.attr('value');
	  var county = $('select[name=county]');
	  state.empty();
	  for (var st in states_data) {
		if (states_data.hasOwnProperty(st)) {
		  var option = $('<option>').attr('value', st).text(states_data[st].name);
		  if (st == stateval)
			option.attr('selected', 'selected');
		  state.append(option);
		}
	  }
	}
	
	function init_county_ddl() {
	  var state = $('select[name=state]');
	  var county = $('select[name=county]');
	  var countyval = county.data('value') || county.attr('value');
	  var counties = states_data[state.val()].counties;
	  county.empty();
	  county.append($('<option>').attr('value','').text('(Select)'));
	  for (var c in counties) {
		if (counties.hasOwnProperty(c)) {
		  var option = $('<option>').attr('value',c).text(counties[c].name);
		  if (c == countyval)
			option.attr('selected', 'selected').prop('selected',true);
		  county.append(option);
		}
	  }
	  county.data('value','');
	}
})();