import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { SesionService } from '../../../services/sesiones.service';
import * as echarts from 'echarts';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-ver-perfil-alumno',
  templateUrl: './ver-perfil-alumno.component.html',
  styleUrl: './ver-perfil-alumno.component.css'
})

export class VerPerfilAlumnoComponent implements OnInit, AfterViewInit {

  alumnosData: any;
  private sesiones: any;
  private claseID: any;

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService){
    this.alumnosData = [];
    this.sesiones = {};
  }

  ngOnInit() {
    this.sesiones.Ambitos = {};
    this.sesiones.Dias= {};
    this.activatedRoute.paramMap.subscribe(params => {
      this.alumnosData = history.state.alumno;
      this.alumnosData.Ambitos = JSON.parse(this.alumnosData.Ambitos);
      this.claseID = history.state.claseID;
    });
  }

  ngAfterViewInit() {
    this.sesionService.getSesionesAlumno(this.alumnosData.ID_Alumno).subscribe((res: any) => {
      const sesionesData = res.sesiones;
      
      this.sesiones.Ambitos.Clase = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Clase);
      this.sesiones.Ambitos.Amigos = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Amigos);
      this.sesiones.Ambitos.Familia = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Familia);
      this.sesiones.Ambitos.Emociones = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Emociones);
      this.sesiones.Ambitos.FueraClase = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin)["Fuera de clase"]);

      this.sesiones.Dias = sesionesData.map((sesion: any) =>  sesion.FechaFin.Fecha);

      var chartDom = document.getElementById('chart')!;
      var myChart = echarts.init(chartDom);
      var option: echarts.EChartsOption;

      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Clase', 'Amigos', 'Familia', 'Emociones', 'Fuera de Clase']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sesiones.Dias
        },
        yAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        series: [
          {
            name: 'Clase',
            type: 'line',
            stack: 'Total',
            data: this.sesiones.Ambitos.Clase
          },
          {
            name: 'Amigos',
            type: 'line',
            stack: 'Total',
            data: this.sesiones.Ambitos.Amigos
          },
          {
            name: 'Familia',
            type: 'line',
            stack: 'Total',
            data: this.sesiones.Ambitos.Familia
          },
          {
            name: 'Emociones',
            type: 'line',
            stack: 'Total',
            data: this.sesiones.Ambitos.Emociones
          },
          {
            name: 'Fuera de Clase',
            type: 'line',
            stack: 'Total',
            data: this.sesiones.Ambitos.FueraClase
          }
        ]
      };

      option && myChart.setOption(option);
    });
    
  }

  volver(){
    this.router.navigate(['profesores/ver-alumnos'], {state: {claseID: this.claseID}});
  }

}
