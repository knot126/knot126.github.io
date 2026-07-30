Shaders (*Smash Hit*)
=====================

.. note:: The shaders subsystem was made by yorshex, go complain to them if it
   doesn't work. :3
   
.. version-deprecated:: 22
   
   This API isn't easy to use and isn't well documented. I doubt yorshex is
   really commited to maintaining it, and no one is using it. I'll keep it in
   the source tree but after r22 it will be removed from the build and the docs
   will be **no longer**.

Example:

.. code:: lua

   knBeginShaders()
   local shader = knGetGameShader("clear")
   local uniform = knGetShaderUniformLocation(shader, "uThirdColor")
   knUseShader(shader)
   knShaderUniform3f(uniform, 0.3, 0.7, 0.65)
   knEndShaders()

.. function:: knBeginShaders()
   
   Stores Smash Hit's current shader in internal state

.. function:: knEndShaders()
   
   Restores Smash Hit's current shader previously saved by :func:`knBeginShaders`

.. function:: knGetGameShader(name)

   Returns Smash Hit's shader program id by name

.. function:: knGetShaderUniformLocation(shader, name)

   Returns a shader program's uniform location by the uniform's name, or
   **``nil``** if it doesn't exist

.. function:: knUseShader(shader)
   
   Sets the shader program as current

.. function:: knShaderUniform1f(location: GLint, v0)
              knShaderUniform2f(location: GLint, v0, v1)
              knShaderUniform3f(location: GLint, v0, v1, v2)
              knShaderUniform4f(location: GLint, v0, v1, v2, v3)
              knShaderUniform1i(location: GLint, v0)
              knShaderUniform2i(location: GLint, v0, v1)
              knShaderUniform3i(location: GLint, v0, v1, v2)
              knShaderUniform4i(location: GLint, v0, v1, v2, v3)

   See also:
   https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glUniform.xml

   Sets a float, vec2, vec3, vec4, int, vec2i, vec3i, or vec4i uniform in
   the current shader program.

.. function:: knShaderUniform1fv(location: GLint, t: table[GLfloat])
              knShaderUniform2fv(location: GLint, t: table[GLfloat])
              knShaderUniform3fv(location: GLint, t: table[GLfloat])
              knShaderUniform4fv(location: GLint, t: table[GLfloat])
              knShaderUniform1iv(location: GLint, t: table[GLint])
              knShaderUniform2iv(location: GLint, t: table[GLint])
              knShaderUniform3iv(location: GLint, t: table[GLint])
              knShaderUniform4iv(location: GLint, t: table[GLint])

   Sets a float, vec2, vec3, vec4, int, vec2i, vec3i, or vec4i uniform
   array in the current shader program.

   The elements are placed linearly inside ``t``, like this:

   .. code:: lua
      
      { x0, y0, z0, x1, y1, z1, x2, y2, z2, ..., xn, yn, zn }

   If the last element is unfinished, it is ignored.

.. function:: knShaderUniformMatrix2fv(location: GLint, transpose: boolean, t: table[GLfloat])
              knShaderUniformMatrix3fv(location: GLint, transpose: boolean, t: table[GLfloat])
              knShaderUniformMatrix4fv(location: GLint, transpose: boolean, t: table[GLfloat])

   Sets a mat2, mat3, or mat4 uniform array in the current shader program.

   The elements are placed linearly inside ``t``, like this:

   .. code:: lua
      
      { x0, y0, z0, x1, y1, z1, x2, y2, z2, ..., xn, yn, zn }

   If the last element is unfinished, it is ignored.

   If ``transpose`` is true, the matrices will be transposed before being
   assigned to uniforms.
