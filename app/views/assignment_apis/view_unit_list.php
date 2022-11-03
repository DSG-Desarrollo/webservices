<style>
    #customForm {
        display: flex;
        flex-flow: row wrap;
    }

    #addUnit {
        display: flex;
        flex-flow: row wrap;
    }
    
    #customForm fieldset {
        flex: 1;
        /*border: 1px solid #aaa;*/
        margin: 0.5em;
    }
    
    #customForm fieldset legend {
        padding: 5px 20px;
        border: 1px solid #aaa;
        font-weight: bold;
    }
    
    #customForm fieldset.name {
        flex: 2 100%;
    }
    
    #customForm fieldset.name legend {
        background: #bfffbf;
    }
    
    
    #customForm div.DTE_Field {
        padding: 5px;
    }

    /**{
        border:1px solid red;
    }*/
</style>
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Listado de unidades</h1> <h3>Transnaara</h3>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item breadcrumb-redirect"><a href="#" onclick="assignmentDHL();">Clientes</a></li>
                    <li class="breadcrumb-item active">Listado unidades</li>
                </ol>
            </div>
        </div>
    </div>
</section>
<section>
    <div class="container-fluid">
        <div id="customForm">
            <fieldset class="name">
                <div data-editor-template="Tid"></div>
                <div data-editor-template="Uid"></div>
            </fieldset>
            <fieldset class="name">
                <div data-editor-template="wa_unit_id"></div>
                <div data-editor-template="FleetName"></div>
                <div data-editor-template="estado_unidad"></div>
            </fieldset>
        </div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#frmAddUnit">
        Nueva unidad
        </button>

        <!-- Modal -->
        <div class="modal fade" id="frmAddUnit" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar unidad</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Seleccionar unidad</label>
                            <select id="units" class="form-control js-example-basic-single"><option>Seleccionar unidad</option></select>
                            <input type="hidden" name="data[wa_name]" id="wa_name">
                        </div>
                    </form>     
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="save_units">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        <table id="unit_list" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Tid</th>
                    <th>Uid</th>
                    <th>Placa</th>
                    <th>Id Wialon</th>
                    <th>Flota</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</section>
<script src="app/views/assignment_apis/js/unit_list.js"></script>