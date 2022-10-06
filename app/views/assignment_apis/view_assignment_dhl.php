<style>
    .pointer {cursor: pointer;}

    #spinner-div {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%;
        top: 500;
        left: 0;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 100;
    }
</style>

<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Listado de clientes</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                    <li class="breadcrumb-item active">Listado clientes</li>
                </ol>
            </div>
        </div>
    </div>
</section>
<section class="content">
    <div class="container-fluid">
        <div id="spinner-div" class="pt-5">
            <div class="spinner-border text-primary" role="status">
            </div>
        </div>
        <table id="client_list" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Nombre cliente</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>API</th>
                    <th>Flota</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</section>
<script src="app/views/assignment_apis/js/assignment_dhl.js"></script>