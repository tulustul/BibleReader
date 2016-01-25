# encoding: utf-8
a = 'ó'
print(bytes(a, encoding='utf-8'))

with open('test', encoding='utf-8') as f:
    print(bytes(f.read(), encoding='utf-8'))
