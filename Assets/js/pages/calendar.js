document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      locale: 'es',
      navLinks: true,
      selectable: true,
      selectMirror: true,
      select: function(arg) {
        var startDate = arg.start;
        var endDate = arg.end ? arg.end : startDate;
  
        // Mostrar fechas en campos de solo lectura
        $('#startDate').val(startDate.toLocaleString());
        $('#endDate').val(endDate.toLocaleString());
  
        // Almacenar la fecha seleccionada en variables globales
        selectedStartDate = startDate;
        selectedEndDate = endDate;
  
        // Limpiar campos de entrada del modal
        $('#eventName').val('');
        $('#eventDetails').val('');
  
        // Mostrar modal
        $('#myModal').modal('show');
        calendar.unselect();
      },
      eventClick: function(arg) {
        if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
          arg.event.remove();
        }
      },
      editable: true,
      dayMaxEvents: true,
      events: []
    });
  
    var selectedStartDate; // Variable para almacenar la fecha de inicio seleccionada
    var selectedEndDate; // Variable para almacenar la fecha de fin seleccionada
  
    // Manejar clic en el botón Guardar del modal
    $('#saveEventBtn').click(function() {
      var eventName = $('#eventName').val();
      var eventDetails = $('#eventDetails').val();
  
      if (eventName.trim() !== '') {
        // Crear evento y agregarlo al calendario
        calendar.addEvent({
          title: eventName,
          start: selectedStartDate,
          end: selectedEndDate,
          allDay: true,
          extendedProps: {
            details: eventDetails
          }
        });
  
        // Cerrar el modal
        $('#myModal').modal('hide');
      } else {
        alert('Por favor, ingresa un nombre para el evento.');
      }
    });
  
    calendar.render();
  });
  