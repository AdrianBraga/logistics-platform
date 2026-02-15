# 🚀 Logistics Platform - Delivery Microservice

Este microserviço é responsável pela gestão de entregas em uma plataforma de logística escalável. O projeto foi desenvolvido focando em **escalabilidade**, **testabilidade** e **independência de infraestrutura**.

## ⚠️ Diferenciais de Engenharia (Nível Sênior)

Diferente de arquiteturas convencionais acopladas ao framework, este projeto utiliza padrões avançados para garantir manutenibilidade:

* **Arquitetura Hexagonal (Ports & Adapters):** O núcleo da aplicação (Domínio) é isolado, comunicando-se com o mundo externo através de interfaces bem definidas.
* **Domain-Driven Design (DDD):** Modelagem focada no negócio, garantindo que a lógica de entrega seja consistente e protegida.
* **Inversão de Dependência (SOLID):** O uso de Repositories como abstrações permite trocar o banco de dados ou ORM sem alterar uma linha de regra de negócio.
* **Infraestrutura Otimizada:** Dockerfile utilizando **Multi-stage Build** para garantir imagens leves em produção (Alpine-based) e segurança.

## 🛠 Stack Técnica

- **Runtime:** Node.js v20+
- **Framework:** NestJS
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker & Docker Compose
- **Validação:** Class-validator & Class-transformer
- **Testes:** Jest

## 🏗 Arquitetura do Projeto

A estrutura segue o fluxo da **Arquitetura Hexagonal**:

- `src/domain/`: Entidades puras, Enums e Regras de Ouro.
- `src/application/`: Casos de Uso (Use Cases) e Contratos (Interfaces) de Repositórios.
- `src/infrastructure/`: Implementação de Repositórios (Prisma), Controllers, Módulos e Configurações de Banco.
- `src/types/`: Tipagens globais e constantes.

## 🚀 Como Executar

O projeto já está configurado para subir todo o ambiente (App + Banco) via Docker.

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/AdrianBraga/logistics-platform.git](https://github.com/AdrianBraga/logistics-platform.git)
    ```
2.  Suba os containers:
    ```bash
    docker-compose up --build
    ```
3.  Acesse a API em: `http://localhost:3000`

## 📈 Roadmap de Evolução
- [ ] Implementação de mensageria com **RabbitMQ** para comunicação assíncrona entre microserviços.
- [ ] Adição de documentação viva com **Swagger/OpenAPI**.
- [ ] Testes de Integração com **Testcontainers**.
- [ ] Implementação de logs estruturados e monitoramento.

---
Desenvolvido por **Adrian Braga** - Foco em Backend de alta performance.