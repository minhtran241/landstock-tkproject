<div align="center">
<h1 align="center">
<img src="https://icons.veryicon.com/png/o/system/easemob-management-background-icon/rest-api.png" width="100" />
<br>LANDSTOCK-TKPROJECT</h1>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/Fastify-000000.svg?style&logo=Fastify&logoColor=white" alt="Fastify" />
<img src="https://img.shields.io/badge/ClickHouse-00AFC7.svg?style&logo=ClickHouse&logoColor=white" alt="ClickHouse" />
</p>
<img src="https://img.shields.io/github/license/minhtran241/landstock-tkproject?style&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/minhtran241/landstock-tkproject?style&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/minhtran241/landstock-tkproject?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/minhtran241/landstock-tkproject?style&color=5D6D7E" alt="GitHub top language" />
</div>

---

## Table of Contents

- [Table of Contents](#-table-of-contents)
- [Overview](#-overview)
- [API Documentation](#-api-documentation)
- [API Routes](#api-routes)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Running landstock-tkproject](#-running-landstock-tkproject)
- [Tests](#-tests)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## Overview

- **Framework:** The project is built on the [Fastify](https://fastify.io/) framework, known for its high performance and low overhead.

- **Database:** We use the powerful [ClickHouse](https://clickhouse.tech/) database to efficiently store and manage real estate data.

- **Domain:** Visit our domain at [https://b.thienkhoi.com](https://b.thienkhoi.com) to access the API's endpoints and explore the wealth of information available.

---

## API Documentation

- Explore the API's endpoints and discover how to use it by checking out our detailed [Swagger documentation](https://b.thienkhoi.com/docs).

---

## API Routes

<details closed><summary>Health Check</summary>

**Description:**
This route handles health checks for the API.

- **Get the health of the API:**  
  Endpoint: `http://b.thienkhoi.com/health`  
  Method: `GET`  
  Returns the health of the API.

<details closed><summary>BDS</summary>

**Description:**
This route handles interactions related to real estate properties.

- **Get all the real estates:**  
  Endpoint: `http://b.thienkhoi.com/bds`  
  Method: `GET`  
  Returns a list of all available real estate properties.

- **Get a real estates by *sID*:**  
  Endpoint: `http://b.thienkhoi.com/bds/sID`  
  Method: `GET`
  Query: `sID`
  Returns a real estate properties that match the provided *sID*.

- **Create a new real estates:**  
  Endpoint: `http://b.thienkhoi.com/bds`  
  Method: `POST`
  Creates a new real estate property.

- **Delete a real estates by *sID*:**
  Endpoint: `http://b.thienkhoi.com/bds/sID`  
  Method: `DELETE`
  Deletes a real estate property that match the provided *sID*.

[More route details and documentation can be found in the provided link to the source code.](https://github.com/minhtran241/landstock-tkproject/blob/main/routes/bds/index.js)

Feel free to provide further information or documentation for your routes as needed in your README.

</details>

<details closed><summary>List</summary>

**Description:**
This route contains sub-routes that list all properties of a certain type.

- **Get all the cities:**  
  Endpoint: `http://b.thienkhoi.com/list/tinh`  
  Method: `GET`  
  Returns a list of all available cities.

- **Get all the districts:**  
  Endpoint: `http://b.thienkhoi.com/list/quan`  
  Method: `GET`  
  Returns a list of all available districts.

- **Get all the wards:**  
  Endpoint: `http://b.thienkhoi.com/list/phuongxa`  
  Method: `GET`  
  Returns a list of all available wards.

- **Get all the directions:**  
  Endpoint: `http://b.thienkhoi.com/list/huongnha`  
  Method: `GET`  
  Returns a list of all available directions.

- **Get all the sections:**  
  Endpoint: `http://b.thienkhoi.com/list/loaihang`  
  Method: `GET`  
  Returns a list of all available sections.

[More route details and documentation can be found in the provided link to the source code.](https://github.com/minhtran241/landstock-tkproject/blob/main/routes/list)

Feel free to provide further information or documentation for your routes as needed in your README.

</details>

<details closed><summary>Customers</summary>

**Description:**
This route handles interactions related to customer properties.

- **Get all the customers:**  
  Endpoint: `http://b.thienkhoi.com/kh`  
  Method: `GET`  
  Returns a list of all available customers.

- **Get a customer by *sID*:**
  Endpoint: `http://b.thienkhoi.com/kh/sID`  
  Method: `GET`
  Query: `sID`
  Returns a customer that match the provided *sID*.

- **Create a new customer:**
  Endpoint: `http://b.thienkhoi.com/kh`  
  Method: `POST`
  Creates a new customer.

- **Delete a customer by *sID*:**
  Endpoint: `http://b.thienkhoi.com/kh/sID`  
  Method: `DELETE`
  Deletes a customer that match the provided *sID*.

[More route details and documentation can be found in the provided link to the source code.](https://github.com/minhtran241/landstock-tkproject/blob/main/routes/kh/index.js)

Feel free to provide further information or documentation for your routes as needed in your README.

</details>

---

## API Models

- BDS models can be found [here](https://github.com/minhtran241/landstock-tkproject/blob/main/queries/create/tb_BDS.sql)
- City models can be found [here](https://github.com/minhtran241/landstock-tkproject/blob/main/queries/create/tb_Tinh.sql)
- District models can be found [here](https://github.com/minhtran241/landstock-tkproject/blob/main/queries/create/tb_Quan.sql)
- Ward models can be found [here](https://github.com/minhtran241/landstock-tkproject/blob/main/queries/create/tb_PhuongXa.sql)
- Direction models can be found [here](https://github.com/minhtran241/landstock-tkproject/blob/main/queries/create/tb_HuongNha.sql)
- Section models can be found [here](https://github.com/minhtran241/landstock-tkproject/blob/main/queries/create/tb_LoaiHang.sql)
- Customer models can be found [here](https://github.com/minhtran241/landstock-tkproject/blob/main/queries/create/tb_KhachHang.sql)

---

## Getting Started

***Dependencies***

Please ensure you have the following dependencies installed on your system:

- [Node.js](https://nodejs.org/en/) (v14.17.0 or higher)
- [npm](https://www.npmjs.com/) (v6.14.13 or higher)
- [fastify](https://www.fastify.io/) (v3.20.1 or higher)
- [ClickHouse](https://clickhouse.tech/) (v21.3.10.1 or higher)

### Installation

1. Clone the landstock-tkproject repository:

```sh
git clone https://github.com/minhtran241/landstock-tkproject
```

2. Change to the project directory:

```sh
cd landstock-tkproject
```

3. Install the dependencies:

```sh
npm install
```

### Environment Variables

- Create a `.env` file in the root directory of the project.
- Add the listed environment variables in the [.env.example](https://github.com/minhtran241/landstock-tkproject/blob/main/.env.example) file to the `.env` file.
- Replace the values of the environment variables with your own values.

### Running landstock-tkproject

```sh
npm run start
```

### Tests

```sh
npm test
```

---

## Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).

```sh
git checkout -b new-feature-branch
```

4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.

```sh
git commit -m 'Implemented new feature.'
```

6. Push your changes to your forked repository on GitHub using the following command

```sh
git push origin new-feature-branch
```

7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## License

This project is confidential and not open-source. All rights to this code and its usage are reserved exclusively for Minh Tran. Unauthorized distribution, modification, or use of this code is strictly prohibited. For any inquiries or collaboration requests, please [email me](mailto:minhthevenus@gmail.com).

---

## Acknowledgments

- [Fastify](https://fastify.io/)
- [ClickHouse](https://clickhouse.tech/)
- [Swagger](https://swagger.io/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Moment.js](https://momentjs.com/)

[↑ Return](#Top)

---
