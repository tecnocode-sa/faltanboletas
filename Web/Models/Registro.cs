namespace FaltanBoletas.Models
{
    public class Registro
    {
        public int Id { get; set; }
        public string Seccion { get; set; }
        public string Distrito { get; set; }
        public string Localidad { get; set; }
        public string Establecimiento { get; set; }
        public string Direccion { get; set; }
        public string Circuito { get; set; }
        public string CP { get; set; }
        public string MesasDesde { get; set; }
        public string MesasHasta { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CantMesasFaltanBoletas { get; set; }
    }
}