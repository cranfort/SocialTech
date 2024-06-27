document.addEventListener('DOMContentLoaded', function () {
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
    select: function (arg) {
      var startDate = arg.start;
      var endDate = arg.end ? arg.end : startDate;
      var startDatetimeString = startDate.toLocaleString();
      var endDatetimeString = endDate.toLocaleString();

      $('#startDate').val(startDatetimeString);
      $('#endDate').val(endDatetimeString);

      selectedStartDate = startDate;
      selectedEndDate = endDate;

      $('#eventName').val('');
      $('#eventDetails').val('');
      $('#eventType').val('');

      $('#myModal').modal('show');
      calendar.unselect();
    },
    eventClick: function (arg) {
      editingEventId = arg.event.id;
      $('#editEventBtn').show();
      $('#deleteEventBtn').show(); // Muestra el botón de eliminar
      $('#saveEventBtn').text('Guardar Cambios');
      $('#myModal').modal('show');
    },
    editable: true,
    dayMaxEvents: true,
    events: function (fetchInfo, successCallback, failureCallback) {
      $.ajax({
        url: base_url + 'calendario/traerDatos',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
          var eventos = response.eventos;
          var formattedEvents = eventos.map(function (evento) {
            return {
              title: evento.eventName,
              start: evento.startDate,
              end: evento.endDate,
              allDay: true,
              backgroundColor: evento.eventColor,
              borderColor: evento.eventColor,
              extendedProps: {
                details: evento.eventDetails
              }
            };
          });

          successCallback(formattedEvents);
        },
        error: function (error) {
          console.error(error);
          failureCallback(error);
        }
      });
    }
  });

  var selectedStartDate;
  var selectedEndDate;
  var editingEventId;

  $('#editEventBtn').hide();
  $('#deleteEventBtn').hide();

  $('#editEventBtn').click(function () {
    var selectedEvent = calendar.getEventById(editingEventId);
    $('#eventName').val(selectedEvent.title);
    $('#eventDetails').val(selectedEvent.extendedProps.details);
    $('#eventType').val(selectedEvent.backgroundColor);
    $('#startDate').val(selectedEvent.start.toLocaleString());
    $('#endDate').val(selectedEvent.end ? selectedEvent.end.toLocaleString() : '');
    $('#myModal').modal('show');
  });

  $('#deleteEventBtn').click(function () {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      var deletedEvent = calendar.getEventById(editingEventId);
      deletedEvent.remove();

      eliminarEvento(editingEventId);

      $('#myModal').modal('hide');
    }
  });

  $('#saveEventBtn').click(function () {
    var eventName = $('#eventName').val();
    var eventDetails = $('#eventDetails').val();
    var eventType = $('#eventType').val();

    if (eventName.trim() !== '' && eventType.trim() !== '') {
      var eventColor = $('#eventType option:selected').data('color');

      if (editingEventId) {
        var editedEvent = calendar.getEventById(editingEventId);
        editedEvent.setProp('title', eventName);
        editedEvent.setExtendedProp('details', eventDetails);
        editedEvent.setProp('backgroundColor', eventColor);
        editedEvent.setProp('borderColor', eventColor);

        actualizarEvento(editingEventId, eventName, eventDetails, eventType, selectedStartDate, selectedEndDate);

        $('#myModal').modal('hide');
      } else {
        calendar.addEvent({
          title: eventName,
          start: selectedStartDate,
          end: selectedEndDate,
          allDay: true,
          backgroundColor: eventColor,
          borderColor: eventColor,
          extendedProps: {
            details: eventDetails
          }
        });

        guardarEvento(eventName, eventDetails, eventType, selectedStartDate, selectedEndDate);

        $('#myModal').modal('hide');
      }
    } else {
      alert('Por favor, ingresa un nombre y selecciona un tipo para el evento.');
    }
  });

  function guardarEvento(eventName, eventDetails, eventType, startDate, endDate) {
    $.ajax({
      type: 'GET',
      url: base_url + 'calendario/Datos',
      data: {
        eventName: eventName,
        eventDetails: eventDetails,
        eventType: eventType,
        startDate: startDate,
        endDate: endDate
      },
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      }
    });
  }

  function actualizarEvento(eventId, eventName, eventDetails, eventType, startDate, endDate) {
    $.ajax({
      type: 'GET',
      url: base_url + 'calendario/actualizarEvento',
      data: {
        eventId: eventId,
        eventName: eventName,
        eventDetails: eventDetails,
        eventType: eventType,
        startDate: startDate,
        endDate: endDate
      },
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      }
    });
  }

  function eliminarEvento(eventId) {
    $.ajax({
      type: 'GET',
      url: base_url + 'calendario/eliminarEvento',
      data: {
        eventId: eventId
      },
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      }
    });
  }

  calendar.render();
});
