<h1 style="text-align: center;">Recipeful - Backend</h1>

<br>

<div style="display: flex; justify-content: center">
    <img src="../images/logo.png" style="width: 50%">
</div>

<br>

## Dependências

- Python3
- pip3
- Nodejs
- npm ou yarn (recomendado)

## Instalação

O backend da aplicação é divido em python (publisher) e nodejs (subscriber/api). Portanto, é necessário instalar as dependências de cada serviço.

Dentro da pasta backend/node, execute o seguinte comando:

```
yarn install
```

Dentro da pasta backend/python, execute o seguinte comando:

```
pip3 install -r requirements.txt
```

## Execução

Para executar o serviço em node, dentro da pasta backend/node execute o seguinte comando:

```
yarn start
```

Para executar o serviço em python, dentro da pasta backend/python execute o seguinte comando:

```
python publisher.py
```