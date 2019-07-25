/* Step 1 import React, { Component } and axios
 *
 */
import { Button, Table } from 'antd';
import { Descriptions, Badge } from 'antd';
import { List, Avatar } from 'antd';
import { Input } from 'antd';
import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Select } from 'antd';
const { Option } = Select;

const recyclablesData = [
  {
    title: 'Paper Products (1 Point)',
    avitar: 'data:image/png;base64,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',
    description: 'Newspaper, Envelopes, Junk Mail, Phone books, Brochures, Magazines',
  },
  {
    title: 'Cardboard Products (2 Points)',
    avitar: 'data:image/jpeg;base64,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',
    description: 'Ream wrappers, File Folders, Poster Board, Frozen food boxes, Cardboard boxes, Milk cartons',
  },
  {
    title: 'Aluminum Products (3 Points)',
    avitar: 'data:image/jpeg;base64,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',
    description: 'Milk jugs (no cartons), Water/Soda containers, Shampoo/Soap/Detergent bottles',
  },
  {
    title: 'Plastic Products (4 Points)',
    avitar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhISExMVFhUVFRgYFxcVGBYYFxUTGBEWFhcVFhcaHyggGBslGxUWIjEiJSktLzouFx8zODMtOCgtLysBCgoKDg0OGxAQGzEmICUtLS8tNS0tLS8tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAP0AyAMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUCAwYBBwj/xABIEAACAQMCAgUHBwoEBQUAAAABAgADBBESIQUxBhNBUYEHIjJhcZGhQlJTkqKx0RQVFiNDVILBwtJicpOyY5TT4fEkMzRzg//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAzEQACAQIDBgQFAwUBAAAAAAAAAQIDEQQSIRMUMUFRkWGBofAiMlJxsULR4QVTYsHxI//aAAwDAQACEQMRAD8A+4wBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEA1VrhE9J1X/ADED75KTfAhtLiQqnSCyX0rqgPbVpj+cuqNR8IvsVdSC4tHidIbE8rq3Psq0/wAYdGouMX2CqQfBk2hdU39B1b/KwO3hKNNcSyafA3SCRAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAKzpLcNTtLl0JVlouVI5ghDgia0IqVSKfVGNeTjSk10Z+aeJVWd2ZyWYncsSSdxzJn0tlFWR48NdWRqY5ySWaavOQy8TO1cqwZSVYHIIOCD3giRx0YbZ+muhV29WxtajsWdqQ1MeZI2yT2nafO4mKjVkl1PVoScqabLuYGogCAIAgCAIAgCAIAgCAIAgCAIAgCAIBA4/Q6y2roflU2G3rUzWi7VIvxMq6zU5LwPzNe0W1MAM4O+N8b7Zxyn0bqR6njQi7cDZZ2VQrUHVMTgacq+++8o68FxZfZzbVjRccOrYB6pv4VYyNvT6l1TkiGbeouMqwycDUCMnuGeZkqpHqS4+B+m+hFv1dhaLuP1Kkg9hYaiPjPBxMs1WT8T0cOrU0XkwNhAEAQBAEAQBAEAQBAEAQBAEAQBAEAQDCsmoEZIz2jGfjJTsQ1dHxrpf0HtlqVHRrkszNhbeg3m5G4ZgpU779/wAZ6MZqpBZtLeP+jz5Z4StHX73/ACUnAuhFPqyXN8DjkG6oElvmdWdO3rPbKy2d9JNllOrziiZfdDqHVjCXrnHol29mPQAPj3yI7NvVtESnVS0SNXCOhFu70kZ7unhgAlW2NVdLYzpqKpReePP283cEZzfNGF8uvn/rQm83bNpwPu1pQ0IqambSMamILH2kATzm7u53JWVjdIJEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAKnjnSK0tAOvqinqzgYZmIHMhVBOBkdnbNadGdT5VczqVYw+ZnNt044IGL6su3NvyasWOBgb9XmdDwdfp6mKr0uRJXyh8L7Hq/8ALXH/AE5G51unqTvFP3YyPlB4Z21XHtoVx/RI3Ot09SN5pGs9N+DMQxqpqByC1JwwPfkpkSd0r9BvFJl3wPpNZ3RZbeutQqASBqBAO2cMBkeyYVKM6fzKxtCpGXBlxMjQQBAEAQBAEAQBAEAQBAEAQBAEAQBAIfFuIJQpNUc7KPEnkAB2kkgAd5E0p03OSijOrUUIuTPk44FcX9w1xWGAT274UejTTuUd+Nzk9s9raU8PDLE8V7SvK51HDuhdBNyuT65y1MdN8DeGB+ovaXCaYGAJyuvJ8zoWEguR5V4TTPNRCryXMl4WD5FLxLohRf5O86aeNkuJzTwX0nKXHRqvZ10urb0qZHm8g68mRu8EfyPMTr2tOvHJIxi6lB35H1jhHEUr0kqpyYcjzB5FT6wcg+yeLVpunJxZ7NKoqkVJE2ZmggCAIAgCAIAgCAIAgCAIAgCAIB4xxvAZV31qK2nVuAdWPXjbPsyZtCbhexz1KaqWvwN1K3VRgDaVcm3qXjBRVkbQkqWPdMEjTBBiUkixprW4PMSVJopKCZX29I2zEqP1bnLD5rfOHqPI++bSltVrxRzxi6D0+V+h0CtkZnKdqdz2CRAEAQBAEAQBAEAQBAEAQBAEAg8Zulp0sscAsqkn1sAfhmaUouUtDKtLLE9s3DU0ccmVWHioMiSs2iYu8UzeBILDEAYgDEAYgHmIBrqUwRgyU7ENJrUjdHrwVEqKP2VapS+o+w9xEmqrP76kUvlsWkzNBAEAQBAEAQBAEAQBAEAQBAEA5zp9a1Klm/VDLIyOB36WBxyM6cK0qlnzOfFJ5LrkSOilZ2s7Y1ENOoKSqyEEFWUacYIHd3TOr87t1L0/lRbZEzLiAIAgWEA8zJBgzDvgi5jYUFXrCoADuWOMbtpAJ255IiTva4grXsS5UuIAgCAIAgCAIAgCAIAgCAIAgHP9OrupSs3qU2Ksr0txzx1yah4jM6MLFSqWZz4ltQ0JHRq5NW0tqh1EvSRst6Ryo3b198rWio1Gl1LUm3BXLLEzNBAPcSAeYkg9xAMcQDwiCD20TAbn6WdyTzAPbyGc7RImKN8qWEAQBAEAQBAEAQBAEAQBAEAQCq6Tigbaotf/ANtsAnGcZYYbHqODNsO5qonDiYYjK4WlwK3gdGrSo06dGmrUQoNNiy0yUYagdCKAOfdnvmk8kpNydn9r/wCzOO0SsldeL/gt0q1e2l9sTFqPX0NU59PU2CrU+j+0siy6ls0uh71j/M+0Isuou+h51r/M+0sWXUi8unqeGtU+jP1lk2XUZpdPU01Lmvjahn/9FElRhzfoVcqnKPqQnuLrI/8ATHHaRXBIHqU6QfeJfLTt83oUvVb+X1Lbh1XUgOGBBIIYgkMDg5IJHxMxmtTeD0JUqXEAQBAEAQBAEAQBAEAQBAEAQCp6VW9KpaVkquKaFcFyQNBzs2Ttscc5th5SjUTirmNdJwdyBwZqlCjTolKlUIoVXpoEUoB5vms5PLtz4CaTSnJyul9/+GMJygsuVv39y0F8foqv1R+O8yyeKNdp/izIXn/DqfVMjL4k7TwZkbofMf6pjL4k7RdDH8sHzKn1G/CMniRtF0PGvgPkVfqN+EZPFEOqujNFTi2P2FwfZTMuqXiu5Xbf4siNxpicfk10M9ppjSPWcam9wPsltirfMu5XbSbtlZbcKOaYOWJJOdQIIOdxgqpwOQyBtiYz4nRT4EyULiAIAgCAIAgCAIAgCAIAgCAIBUdLOHi4tK1Etp1rhT3PkFc+rIE2w88lRSMcRFSptFVw3jVK2pUqNZxqpqFJprUqJsMDDYydsZP3TaVCVRuUV6o51iYQWWT9GydT6UWbcqv2Kg/plHhaq5fgvvlHr6Mkfnu2+k+y34SuwqdC280upl+eLf5/2W/CRsZ9BvNLqPzxb/P+y34RsZ9BvFLqYtxq3HOp9l/wk7Gp0G80uppqdI7Mc6o+q/4SVhqr5Fd7o/UV9300sVx+vHPHoP8Aedh7TtNVg61r5SrxlPk/QvuDXCVKQqI4dWJOpSCM5wQCNjggictSLjKzVjppNON07k6UNBAEAQBAEAQBAEAQBAEAQBAEAo+mvDfyiyr0RjUwGnVjBcMCqn2nbxm+GnkqJmGIjmptETgfE1oUaVC5qBKiIEOtwSdIwCWG2435y9Sk5ScoLQpTrKKyyepapxe2blWpn2Op/nMnSmuKNNrB8zaKtI9qH3StmTeJ7+q/wfCNSfhPMUv8Hwk/ER8PgCKXcnuEj4h8Pga3ubdebUx7SokqMmRmguhGrcctgMCqueQ05Y5PLCgHJllSm+RV1oLmWHDSerBLas75xg+I238JSfE1p8CVKFxAEAQBAEAQBAEAQBAEAQBAEA4jyyVnThVcoSG1U8Fcgg9auCCORzOrBq9TyZhXtZX6o6S1proUjBBUHUMHUMDfPbnvmLkyyguhs6hTzUH2iRmYyR6GLWVI/s0+qJbPLqMkehg3DqP0VP6i/hG0l1I2cehj+baH0VP6i/hJ2k+o2UOhkeGUPoqf1F/CRtJ9Rs49DH8gpDlTUewARtJdQ6cehjUsUII0DHsllUfUo6UXyMujlHQlRAukLUOBjAwUVtvVkmK8szT8BhY5YteJbTA6RAEAQBAEAQBAEAQBAEAQBAEAoemy0WtWp1a3UioyqtTVp01M5G+R3HI7RmdGGzZ7pXsYYi2Sz5lLwTi9KzopbNqcUxtVVNKsuSRkE9gwM755zeWHlVedPyucyxMafwtPsT06aWJ26wjwLfFciV3Kt0Lb9R6kn9J7P6Y/Ub+2U3Wt9JO+UfqMx0htD+396kfesbrV+kne6P1D9ILT6ce7/tG7VfpJ3ql9ZhW6Q2n7xj2AfzUwsNV+kh4ml9RDTpZYqTm6dvUUOPDCD75fdKz/AElFiqS/UR7jyg2I2XrHPcqNn4iW3Crz/I36m3Zal90avadaiaqKyhnbKvnUCNu3vGD4zmrQcJZWdNCSlHMkW0xNhAEAQBAEAQBAEAQBAEAQBAEA5zp9w169m6UzipkFAQCGYZGkg7bgnHrwZ04SajUTfDmc+KjeHjyNHAbjq7elRep1dVVAZauWw3qJc5HcAx2xiWqQvJySuvAyhUSWVuz8dSQ9O4Y7VrR17jROff1pkJwXFS7/AMD43wlHt/JrqcKc/srE+2mRv8ZZVkucu5V0G/0x7GLcPr4GLexPf6Xw8z2Syqx+uXvzKOhP6Ie/IxHDK37pZfH+yTto/XL35hUJ/wBuHvyM6nCN9rSyx3nnn2dXK7bT55e/MtsX/bh78jJeG4529kvr05/pH3yrqX5yLqFuUV78jZUulpIdVa3T/IgHwL7nwlVFyeib9/Ys5qK1kvL/AKSujaeY7a3cM2RrJJGAAdj6O4Pm9nwFK2jSsaUNU3fiW8xNxAEAQBAEAQBAEAQBAEAQBAEA4nysNUFrQam+hluabZLMoOEc6Sy7gHGPbiduBSc2n0/2jkxjtFff/TJ3DOH2t1RSs1EefuesRQ4YbEFlAJ3HpZ3G/bInVqUp5U+HR6FYUaVSN2r/AHWpFq9GLAMfO0t/99TUB/E5l1ia1uHp/BnLD0E+NvP+TaOjNDGRc1wPVVXH+2RvM+cV2JeFp8pvuZN0eX99ufGqP7Y3l/QuxG6x/uPuYjo2P3y4/wBUfhJ3l/Quw3Vf3H3M26NDtu7r/VH9shYp/QuxO6L633Ir9DqLc61ZvbWP8gJO9zXJLyRCwkOt/Mwq9BrNQXKqcD0qrVH8SGfT8JKxtR6fjQmWEitdCV5PqlLTcJScOiVAMhBTXVg6gqgDEpjU7xbVrrrctgtMyTudbOI7hAEAQBAEAQBAEAQBAEAQBAEA5jyh3NBbXRXB6urUVGIAJXm4YA9oKAzrwcZOpePFK5yYyeWCXV2Ka14ulC3pBqPWW4GhKlUKrMuntzzyCN8b++dGwc5u0rS6I5dvkj8Ubr7EFLzg7sSLd6ZPap2PgCfum2zxUVbNcxc8LLjFompccMClRUuVXu84+7zTKZcTe9kxfC2tdmxfzdpAFzXA8c/7NozYi98i9+ZGzwvKb9+RqFtw396rD3j+mWz4j6F78yNlhvrfvyMKlLhanJuLg/5Q38kkZsS/0r35lsmFX6n78iObzhC53uW/idQfEEGWyYp9PQJ4VdTRcdKrBRop2XWk8hVIfUfVqLMTCwtbjKdvsW3ijwjC/wBzrugvF1uKVQin1bKwDoF0BTjAAHPGAOfrnDi6TpyWtzuwlTOnpY6ach1iAIAgCAIAgCAIAgCAIAgCAIBy3lHtlq2gpEgO9VRTZjgLUwSMnuIDD+KdmBbVW65LX7HJjbbOz66HL0+G0AFR7qtTYKNg2tdWN2DqRqUjTtgHadu0qcVBP0POy0+EpNeopcCo5PV3lB87kVQAfbuGIk7xL9UGvsQ8On8s156GR6KVR+0pnPdV2+OJbfY9H2KbnPqu5Kq8CrFVHmkjuekPDYjMosTTT/6HhKrXLuiN+jVfuH16X90vvdP2mVWErdPVCv0ZuGbOqkox8t0wfAZEhYymlz7F90qeHc30uFVUUqWsVzuahCEj2HT7tpm60JO9pfY1jSnFWvH7lf8AkdpRyx4k++5FtlST2nWuc+6Xz1J6Kn3IyU48anY67oCLc06r0Sx1uCS7l32XSNZPI5VtvZOHGZ7pS5Hdg8tm4nUzjO0QBAEAQBAEAQBAEAQBAEAQBAOS8p9mKtkV5uKiFFAyXcZ80Dv0lj4TtwEnGr4W1OTGpbPXrochZ9HrlqKmm6sxXdNeKiHPIq+MEcufZPQeKpqXxK349DzN2m1eNn+SB+YbxCddOp7Shx7xsZusRSlwaMZ0akeMWbfycjnpX1bg/GSmmYttE+tjQuGcEc81CRy5gYGJmks2qXYlzdtPyRl1fPbn2ORLZY9PQhTfU0X6OTjIHrL58ZMbWJbfU18S4ZTZlFsKjErl1YairfNBUZYes/8AiKdSST2lvA1lGLa2d2e2/RS9bzimF5k1vMXxyQ2PCVli6S0v21NI4ao/02++h3fk54WKFOv56sWqD0FwmyfJPyhkkavVPMx1XPKOltD0sFDKpa8zr5wncIAgCAIAgCAIAgCAIAgCAIAgHL+UUEWq1QxXqqqOSOYG6bDtOXG3unZgWtplfNNHHjot07rk7nz6pfVSA7jUWBwzE5O5HPA1bAHxnrRhDhE8abkneQtuJXK4C1ao9jnHuJlnRpvil2IVaa4SfctvzxefTOR/iAI+P4zLdqXQtvdXqbrniVyFU/qWz/w1J8QQJSOHp3fHuWeJlbl2/gj0+LXB5pR5/RIP5GXeHh1fdld5l4dkeV+NXabBkUnbCIgHvA3kLDUnq79yyxdT2iqbil2usLVcZbJ0kLk95wJrsaTs7FdtNcGVl5cV6hwxdydhqbOfYCTmaxhCCulYq5yk9Xc+jeSuzuKdGt1wYeeoQNnIULnGk+iPP5Tx/wCoThKSynr4CMlF3O4nnneIAgCAIAgCAIAgCAIAgCAIAgHH+VGoy2auAGC16ZcH0SnnDDeokgeM7v6fba28GceOV6fmjj7PjdwtMFSVQrkUmXUoJ3AVW83Az8J6MsPTk9ePU8pYicdE9DXQ4uWYB7WiT3rqpk+CFRLui4r4Zv8AP5KOqn80V+PwTbq+orgGi4z8ypn4MpMpGFR8Jd0Q3S+n1MK3EbcAZFf2Ert4mmB8ZaMKl+XvzItTtz7/AMGpeJWvdV+z/JZZwq+HvzIy0/Huv2ML3jdp2rWbuw1Mbj+DMqqVXqvfmX/8+j7/AMEI8et8ZSzLt31Kj8+/CYBltjU5z7JFs1Nfp7tmFXpTeaSKCUbfIx5iKD7c85G6Qesm392XWIa0Wi8Edt5J61Zqdx1rF2Drlj8pipJPLnjT4ATzv6hFRcbdDvwErqT8TvJ5x6AgCAIAgCAIAgCAIAgCAIAgCAcj5UbpUsvP1dW9WmlTT6Wgkk49eQJ2YFXq+TOXGX2enVHF2/FLIppUakUD9YtQK+APlqcpq909LZ1ON/Lj68TyW4Xs4+fB9uBlYXFnUOadVjjnrp7D1alLfdJbqJars/3KOEOr81+xOuKKnGKlH6zf1IJEZtcU/fmZumnwkvX9j25oVCi50aRyJqU8cuzLCIzjfT8MSpztx9URFtW/wfXpf3TXaLx7P9imR+HdfubryxLbs1NTtuzIf9pJ7pnGqlwT7M0VJ82u5W1aVumTUuqYHeq1G+9VGfGXzzfCPdr+Sypxf6uyb/Y1G+sVHmrVrHH7RhSXbtwpLH34k5a0uLS+2v5LWprk399Pwdt5MuK9ctcBAiqabYUAKCwdSE7ximu++5M83+oU8ji79ffqejgJt5l9vfodvPOPREAQBAEAQBAEAQBAEAQBAEAQDk/Khwxq/DqwUZNPFTHeEOWx69Or3TrwU1Csr89DDExcqbsfnm2tCXHVgMTsFYAj47T3stjy3U0+I+i8MtXWhQYrgPTVxoGBuAcYHrmOdNtHLVi0ySbhhgA+/wB0skjFonVa66FIpgN2nJwfA8pkk8zuyztZWRoTzioC+cGBG+Bn1+rfEu3YiKfA1X7ZPo4xz37e3skwegaIFxQ1eaRkHs558JdMlMouI1bW3fR1Y6ztCIp0nuY5GD6t5MZX4G6hUkrtn1DyUcPq01uXqY/WGnpKnIwA5OPYWIz24z2zyf6jUUnFLlc9HAQy5n9jvp5p6IgCAIAgCAIAgCAIAgCAIAgCAeMR2wD45xXoR1F4zp/8YMKmpedKkW8/wQn6pzvgz26WMzUrP5uH3PHrYf8A9P8AE7nhXClWmaXWCoqsdPLKBgG0MQcHc5HLZhtjE4alZuWa1johQWXK3exjcdHkY8paOKkkZywabK+54Rb0wDWZaaZwup9IY4LFQSeelWPgZqsRKXy6sy3RK9+BB4Nc8NuHNJKqhwyEAMcuUcOApbOobDkc+yXqutBZmroilTpt2ehZ3XRpSx5zOGLaRM8H8WhusuC0wSBglCMjYkZGRkdkrPESav1LU8Kr2KbpT0QtmfrlpBqztspYhaj4AywO2keke/GO2Xo4mVsr4F6lDW6O46OcOFvb06WvWwGXc83qH0mx2b8h3YnBWqOc3I76MFCNkWcyNRAEAQBAEAQBAEAQBAEAQBAI9e5Al4xuUlOxz/FeJ1ADpnXSpR5nJUqSPnt/xW+NYPTdlKnYj3cuR9hncqUGrW0MM7WvMsbLpJdUSan5PRLNgOUFRdYB2yAdIIGwONhty2lZYWMlbM/AiOIcXdRN/F+lN3WUpSXqg40s7El0HaadNQBq7izsPVMI4O3M1eKT5HN9IrDXSNGlWdwGWsOuRmzXBZGLvVLnT1TldPnDUoYYyQdqdKd7vT9vIrKtFaI5av0cuWxpWmpUhg6IQdWQdtOAQMdqg7+7ptdcTNVbPmzvuifSS5t6KUa4LFMDUGYtUXOTrWoDpODjKnwnJUwmZ3uarEJLRF9cdNEQP1NF2diCesIABChRuuSRt6u2ZbnJ/MyyxC5I4+54pd1aoqux1DOkDZVB+So7BsPdvmdEYQgrJFW3LVna9HuL1SozmYVaUXqTGconW2d8W5zinTsdcKlyxExNhAEAQBAEAQBAEAQBAEA8IgGt6AMspNFXFMh3HDFaaRqtGbpJkH9H6fzZpvDM3QDcEXukquyuwRgeBL3Sd4ZG7o1NwCW3kjdwOj47pG8DdzFujansk7yydgKfRhO6Q8SyVQNv6L0/miV3hl9gS7XgSLymbrtllRRY0rRVmbm2aKCRIlC4gCAIAgCAIAgCAIAgCAIAgCAIAgCAIB5iAMQD2AIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgH//Z',
    description: 'Aluminum beverage cans,  Food cans, Scrap metal',
   
  },
  {
    title: 'Glass Products (5 Points)',
    avitar: 'data:image/jpeg;base64,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',
    description: 'Beverage containers, Glass food jars',
  },
];


/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class RecyclingItems extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        recyclingItems: [],
        isNewFormShowing: false,
        newItem: {
            name: "",
            type: "",
            points: 0
        }
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        this.getAllItems()
    }
    
    getAllItems = () => {
        axios.get(`/api/users/${this.props.match.params.userId}/recyclingItems`)
            .then((res) => {
                this.setState({recyclingItems: res.data})
            })

    }

    handleInputChange = (event) => {
        const copiedNewItem = {...this.state.newItem}
        copiedNewItem[event.target.name] = event.target.value
        this.setState({newItem: copiedNewItem})
    }

    handleItemTypeChange = (value) => {
        const copiedNewItem = {...this.state.newItem}
        copiedNewItem.type = value
        this.setState({newItem: copiedNewItem})
    }

    handleItemPointsChange = (value) => {
        const copiedNewItem = {...this.state.newItem}
        copiedNewItem.points = value
        this.setState({newItem: copiedNewItem})
    }

    handleNewItemSubmit = (event) => {
        event.preventDefault()
        axios.post(`/api/users/${this.props.match.params.userId}/recyclingItems`, this.state.newItem)
        .then(() => {
            this.setState({
                isNewFormShowing: false
            })
            this.getAllItems()
        })
    }
   

    handleToggledNewForm = () => {
        this.setState((state) => {
            return {isNewFormShowing: !state.isNewFormShowing}
        })
    }
    

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        const columnNames = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: item => <Link to={`/users/${this.props.match.params.userId}/recyclingItems/${item._id}`}>{item.name}</Link>
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Points',
                dataIndex: 'points',
                key: 'points',
            },
            // {
            //     title: 'More Info',
            //     dataIndex: 'moreInfo',
            //     key: 'moreInfo',
            //     render: text => <Link to={`/users/${this.props.match.params.userId}/recyclingItems/${item._id}`}>{text}</Link>
            // }
        ]
        let recyclingItemsList = this.state.recyclingItems.map((item) => {
            return(
                // <Descriptions layout="vertical" size="small" bordered>
                // <Descriptions.Item label="Product">
                //     <Link 
                //         to="/"
                //         key={item._id} 
                //         to={`/users/${this.props.match.params.userId}/recyclingItems/${item._id}`}
                //     >
                //         {item.name}
                //     </Link>
                // </Descriptions.Item>
                // <Descriptions.Item label="Type">{item.type}</Descriptions.Item>
                // <Descriptions.Item label="Points">{item.points}</Descriptions.Item>
                // </Descriptions>
                    {
                        name: {
                            name: item.name,
                            _id: item._id
                        },
                        type: item.type,
                        points: item.points,
                        moreInfo: item._id
                    }
                //     <Link 
                //     to="/"
                //     key={item._id} 
                //     to={`/users/${this.props.match.params.userId}/recyclingItems/${item._id}`}
                // >
                //     {item.name}
                //     </Link>
                //         {item.type}
                //         {item.points}
            )
        })
        console.log(recyclingItemsList)
        return (
            this.state.isNewFormShowing
            ?
            <form onSubmit={this.handleNewItemSubmit}>
                <div className="example-input">
                <label htmlFor="new-item-name">Item Name</label>
                    <Input 
                        size="large"
                        type="text" 
                        id="new-item-name" 
                        name="name" 
                        onChange={this.handleInputChange} 
                        // value={this.state.newItem.name}
                    />
                </div>
                <div>
                    <label htmlFor="new-item-type">Item Type</label>
                        <Select 
                            style={{ width: 120 }}
                            defaultValue="type"
                            name="type"
                            id="new-item-type"
                            onChange={this.handleItemTypeChange} 
                            // value={this.state.newItem.type}
                        >
                            <Option value ="paper">Paper</Option>
                            <Option value ="cardboard">Cardboard</Option>
                            <Option value ="aluminum">Aluminum</Option>
                            <Option value ="plastic">Plastic</Option>
                            <Option value ="glass">Glass</Option>
                        </Select>
                    </div>
                <div>
                    <label htmlFor="new-item-points">Item Points</label>
                        <Select  
                            style={{ width: 120 }}
                            defaultValue="points"
                            name="points" 
                            id="new-item-points"
                            onChange={this.handleItemPointsChange} 
                            // value={this.state.newItem.points}
                        >
                            <Option value ="1">1</Option>
                            <Option value ="2">2</Option>
                            <Option value ="3">3</Option>
                            <Option value ="4">4</Option>
                            <Option value ="5">5</Option>
                        </Select>
                    </div>
                <input type="submit" value="Add Item" />
            
            </form>
            :
            <div>
                <a class="back-link" href="/"> Back to All Users</a>
                <h1>My Recycled Items</h1>
                
                <Table columns={columnNames} dataSource={recyclingItemsList}/>
                <Button  type= "primary" onClick={this.handleToggledNewForm}>Add Item to List</Button>
                <h1>Recycling Guide</h1>
                <List
                    itemLayout="horizontal"
                    dataSource={recyclablesData}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avitar} />}
                            title={<a href="https://www.republicservices.com/recycling-guide">{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                    )}
                 />
            </div>
        )
    }
}
