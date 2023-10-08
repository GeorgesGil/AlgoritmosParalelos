# Etapa de construcción
FROM golang:latest AS builder

WORKDIR /code

ENV CGO_ENABLED 0
ENV GOPATH /go
ENV GOCACHE /go-build

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod/cache \
    go mod download

# Copy the entire app directory
COPY . .

# Ensure you are copying the templates directory correctly
COPY ./templates ./

RUN --mount=type=cache,target=/go/pkg/mod/cache \
    --mount=type=cache,target=/go-build \
    go build -o bin/app main.go

# Etapa para configuración del entorno de desarrollo
FROM builder as dev-envs

RUN apk update && \
    apk add git && \
    addgroup -S docker && \
    adduser -S --shell /bin/bash --ingroup docker vscode

# Etapa para contenedor mínimo
FROM scratch

# Copy the binary and the templates directory from the builder stage to the minimal container
COPY --from=builder /code/bin/app /usr/local/bin/app
COPY --from=builder /code/templates /templates

# Command to execute the application
CMD ["/usr/local/bin/app"]
