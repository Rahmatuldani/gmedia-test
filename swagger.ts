import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Request, Response, Express } from "express";

const swaggerDocs = (app: Express) => {
    const options = {
        definition: {
            servers: [
                { 
                    url: "http://localhost:8080/api",
                    description: "Development server"
                }
            ],
            openapi: "3.0.0",
            info: {
                title: "PT Warung Madura API",
                description: "Open API PT Warung Madura",
                version: "1.0.0",
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "apiKey",
                        name: "authorization",
                        scheme: "bearer",
                        in: "header",
                    },
                },
            },
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        apis: ["./routes/*.ts"],
    };

    app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

    const swaggerSpec = swaggerJsdoc(options);
    app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Documentation in JSON format
    app.get(`/docs.json`, (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};

export default swaggerDocs;
