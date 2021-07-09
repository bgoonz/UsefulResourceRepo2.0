</head>
<body>
    <div id="container" class='container'>
        <div class="row"></div>
    </div>
</body>

<script>'use strict';
        document.getElementsByClassName('container')[0].getElementsByClassName('row')[0].insertAdjacentHTML('afterend', `<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"><\/script>
              <div id="timeline" style="height: 180px;"></div>\n\n      <script> google.charts.load(\'current\', {\'packages\':[\'timeline\']});
              google.charts.setOnLoadCallback(drawChart);
               function drawChart() {
                   var container = document.getElementById(\'timeline\');
                   var chart = new google.visualization.Timeline(container);
                    var dataTable = new google.visualization.DataTable();
                    dataTable.addColumn({ type: \'string\', id: \'President\' });
                    dataTable.addColumn({ type: \'date\', id: \'Start\' });
                    dataTable.addColumn({ type: \'date\', id: \'End\' });
                    dataTable.addRows([
                         [ \'Washington\', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
                         [ \'Adams\',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
                         [ \'Jefferson\',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);
                         chart.draw(dataTable);
                         }<\/script>`);
    </script>