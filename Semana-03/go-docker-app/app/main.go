package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var db *sql.DB

type Producto struct {
	ID       int    `json:"id"`
	Nombre   string `form:"nombre" binding:"required"`
	Cantidad int    `form:"cantidad" binding:"required"`
	Precio   int    `form:"precio" binding:"required"`
}

func initDB() *sql.DB {
	connStr := "user=georgesgil password=1182363 dbname=georgesgil sslmode=disable host=postgres port=5432"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	// Crea la tabla productos si no existe
	_, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS productos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            cantidad INT NOT NULL,
            precio INT NOT NULL
        );
    `)
	if err != nil {
		panic(err)
	}

	return db
}

func main() {
	db = initDB()
	defer db.Close()

	r := gin.Default()

	r.LoadHTMLGlob("templates/*.html") // Cargar plantillas HTML desde la carpeta templates

	r.GET("/", func(c *gin.Context) {
		var productos []Producto
		rows, err := db.Query("SELECT * FROM productos")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		for rows.Next() {
			var p Producto
			err := rows.Scan(&p.ID, &p.Nombre, &p.Cantidad, &p.Precio)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			productos = append(productos, p)
		}

		c.HTML(http.StatusOK, "index.html", gin.H{
			"productos": productos,
		})
	})

	r.GET("/crear.html", func(c *gin.Context) {
		c.HTML(http.StatusOK, "crear.html", nil)
	})

	r.POST("/guardar", func(c *gin.Context) {
		var producto Producto
		if err := c.ShouldBind(&producto); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		_, err := db.Exec("INSERT INTO productos (nombre, cantidad, precio) VALUES ($1, $2, $3)",
			producto.Nombre, producto.Cantidad, producto.Precio)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Redirigir a la página principal después de guardar el producto
		c.Redirect(http.StatusFound, "/")
	})

	r.GET("/editar.html", func(c *gin.Context) {
		id := c.DefaultQuery("id", "0")

		// Obtener los detalles del producto basado en el ID de la base de datos
		var producto Producto
		err := db.QueryRow("SELECT * FROM productos WHERE id = $1", id).Scan(&producto.ID, &producto.Nombre, &producto.Cantidad, &producto.Precio)
		if err != nil {
			// Manejar el error, por ejemplo, redirigir a una página de error
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Pasar los datos del producto a la plantilla
		c.HTML(http.StatusOK, "editar.html", gin.H{
			"id":       producto.ID,
			"nombre":   producto.Nombre,
			"cantidad": producto.Cantidad,
			"precio":   producto.Precio,
		})
	})
	r.POST("/actualizar", func(c *gin.Context) {
		id := c.PostForm("id")
		// Obtén los datos del formulario y verifica que sean correctos
		var producto Producto

		if err := c.ShouldBind(&producto); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		fmt.Println("Datos del producto recibidos:", producto)

		// Realiza la actualización en la base de datos
		_, err := db.Exec("UPDATE productos SET nombre=$1, cantidad=$2, precio=$3 WHERE id=$4",
			producto.Nombre, producto.Cantidad, producto.Precio, id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.Redirect(http.StatusFound, "/")
	})

	r.GET("/eliminar.html", func(c *gin.Context) {
		id := c.DefaultQuery("id", "0")
		_, err := db.Exec("DELETE FROM productos WHERE id=$1", id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.Redirect(http.StatusFound, "/")
	})

	r.Run(":8000")
}
