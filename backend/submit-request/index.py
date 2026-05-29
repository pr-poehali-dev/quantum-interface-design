import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет заявку с формы сайта в базу данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Имя обязательно'}
        }

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.requests (name, phone, message) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, message)
    )
    request_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True, 'id': request_id}
    }