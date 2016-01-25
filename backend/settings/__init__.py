try:
    from settings.local import *
except ImportError:
    from settings.dev import *
