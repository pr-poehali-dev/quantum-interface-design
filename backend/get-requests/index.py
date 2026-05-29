import json
import os
import psycopg2


ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')


def handler(event: dict, context) -> dict:
    """Возвращает список заявок для админ-панели. Требует пароль."""
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
    password = body.get('password', '')

    if password != ADMIN_PASSWORD:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Неверный пароль'}
        }

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"SELECT id, name, phone, message, created_at FROM {schema}.requests ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    requests_list = [
        {
            'id': row[0],
            'name': row[1],
            'phone': row[2],
            'message': row[3],
            'created_at': row[4].isoformat() if row[4] else None
        }
        for row in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'requests': requests_list}
    }